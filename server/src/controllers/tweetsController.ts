import type { Request, Response } from 'express'
import mongoose from 'mongoose'
import Tweet from '../models/tweet.js'
import User from '../models/user.js'

interface TimelineQuery {
  limit?: string
  cursor?: string
  onlyRoots?: string
  repliesTo?: string
}

const toUpperNoSpaces = (value: string): string => value.replace(/\s/g, ' ').toUpperCase()

const getExactDateParts = (createdAt: Date, timeZone: string) => {
  const d = new Date(createdAt)
  const timeFmt = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone,
  })
  const dayFmt = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone })
  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone })
  const yearFmt = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone })

  return {
    time: toUpperNoSpaces(timeFmt.format(d)),
    day: dayFmt.format(d),
    month: monthFmt.format(d),
    year: yearFmt.format(d),
  }
}

const getTimeAgo = (createdAt: Date, now: number): string => {
  const diff = Math.floor((now - createdAt.getTime()) / 1000)
  if (diff <= 0) return 'now'
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export const getTweets = async (req: Request<unknown, unknown, unknown, TimelineQuery>, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit ?? '10', 10), 50)
    const { cursor, onlyRoots, repliesTo } = req.query

    const query: Record<string, unknown> = {}
    if (onlyRoots === 'true') {
      query.inReplyTo = null
    }
    if (repliesTo) {
      query.inReplyTo = repliesTo
    }
    if (cursor) {
      try {
        query._id = { $lt: new mongoose.Types.ObjectId(cursor) }
      } catch (err) {
        return res.status(400).json({ error: 'Invalid cursor', details: err instanceof Error ? err.message : err })
      }
    }

    const items = await Tweet.find(query)
      .sort({ _id: -1 })
      .limit(limit)
      .populate('authorId', 'username nickname avatar')
      .lean()

    const now = Date.now()
    const baseMediaUrl = process.env.MEDIA_BASE_URL ?? ''

    const payload = items.map((tweet) => ({
      _id: tweet._id,
      content: tweet.content,
      image: tweet.image ? `${baseMediaUrl}/${tweet.image}` : null,
      likeCount: tweet.likeCount,
      replyCount: tweet.replyCount,
      createdAt: tweet.createdAt,
      timeAgo: getTimeAgo(new Date(tweet.createdAt), now),
      author: tweet.authorId && typeof tweet.authorId === 'object'
        ? {
            username: (tweet.authorId as any).username,
            nickname: (tweet.authorId as any).nickname,
            avatar: `${baseMediaUrl}/${(tweet.authorId as any).avatar}`,
          }
        : null,
    }))

    return res.json({
      items: payload,
      nextCursor: items.length ? String(items[items.length - 1]._id) : null,
    })
  } catch (err) {
    return res.status(500).json({ error: 'Error while getting tweets', details: err instanceof Error ? err.message : err })
  }
}

export const getParentTweet = async (req: Request<{ tweetId: string }>, res: Response) => {
  try {
    const { tweetId } = req.params
    const tweet = await Tweet.findById(tweetId).populate('authorId', 'nickname username avatar').lean()
    if (!tweet) {
      throw new Error('Tweet not found')
    }
    if (!tweet.authorId || typeof tweet.authorId !== 'object') {
      throw new Error('Tweet author is unavailable')
    }

    const { time, day, month, year } = getExactDateParts(new Date(tweet.createdAt), 'Europe/Brussels')
    const baseMediaUrl = process.env.MEDIA_BASE_URL ?? ''

    return res.status(200).json({
      tweet: {
        _id: tweet._id,
        content: tweet.content,
        image: tweet.image ? `${baseMediaUrl}/${tweet.image}` : null,
        likeCount: tweet.likeCount,
        replyCount: tweet.replyCount,
        createdAt: tweet.createdAt,
        timeAgo: getTimeAgo(new Date(tweet.createdAt), Date.now()),
        exactTime: time,
        exactDay: day,
        exactMonth: month,
        exactYear: year,
        author: {
          username: (tweet.authorId as any).username,
          nickname: (tweet.authorId as any).nickname,
          avatar: `${baseMediaUrl}/${(tweet.authorId as any).avatar}`,
        },
      },
    })
  } catch (err) {
    return res.status(404).json({ error: err instanceof Error ? err.message : err })
  }
}

export const createTweet = async (req: Request, res: Response) => {
  try {
    const { content, image, inReplyTo } = req.body as {
      content?: string
      image?: string | null
      inReplyTo?: string | null
    }
    const authorId = (req as any).user?.id
    if (!authorId) {
      throw new Error('Unauthorized')
    }

    const user = await User.findById(authorId)
    if (!user) {
      throw new Error('User does not exist')
    }

    let rootId: mongoose.Types.ObjectId | null = null

    if (inReplyTo) {
      const parentTweet = await Tweet.findById(inReplyTo)
      if (!parentTweet) {
        throw new Error('Parent tweet does not exist')
      }

      rootId = parentTweet.rootId ?? parentTweet._id
      await Tweet.findByIdAndUpdate(inReplyTo, {
        $inc: { replyCount: 1 },
      })
    }

    const newTweet = await Tweet.create({
      content,
      image,
      authorId,
      rootId,
      inReplyTo,
    })

    const now = Date.now()
    const timeAgo = getTimeAgo(newTweet.createdAt, now)

    return res.status(201).json({
      message: 'Tweet created successfully',
      ...newTweet.toObject(),
      timeAgo,
      author: {
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
      },
    })
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}

const deleteRepliesRecursively = async (parentId: mongoose.Types.ObjectId) => {
  const replies = await Tweet.find({ inReplyTo: parentId })
  for (const reply of replies) {
    await deleteRepliesRecursively(reply._id)
    await reply.deleteOne()
  }
}

export const deleteTweet = async (req: Request<{ tweetId: string }>, res: Response) => {
  try {
    const { tweetId } = req.params
    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
      throw new Error('Tweet does not exist')
    }

    if (tweet.inReplyTo) {
      await Tweet.findByIdAndUpdate(tweet.inReplyTo, {
        $inc: { replyCount: -1 },
      })
    }

    await deleteRepliesRecursively(tweet._id)
    await tweet.deleteOne()

    return res.status(200).json({ message: 'Tweet deleted successfully' })
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}

export const updateTweet = async (req: Request<{ tweetId: string }>, res: Response) => {
  try {
    const { tweetId } = req.params
    const { content } = req.body as { content?: string }
    const userId = (req as any).user?.id

    if (!tweetId) {
      throw new Error('Tweet id is required')
    }

    const tweet = await Tweet.findById(tweetId)
    if (!tweet) {
      throw new Error('Tweet does not exist')
    }

    if (!userId || tweet.authorId.toString() !== userId) {
      throw new Error('You cannot update someone else\'s tweet')
    }

    if (typeof content === 'string' && content !== tweet.content) {
      tweet.content = content
    }

    const updated = await tweet.save()

    return res.status(200).json({ updated })
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}
