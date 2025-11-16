import type { Request, Response } from 'express'
import User from '../models/user.js'
import Tweet from '../models/tweet.js'

interface AuthenticatedRequest extends Request {
  user?: {
    id: string
  }
  dateInfo?: {
    year: string
    month: string
  }
}

export const getUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const user = await User.findById(userId).lean()
    if (!user) {
      throw new Error('This user does not exist')
    }

    const { nickname, username, avatar, header, bio, email, followersCount, followingCount } = user
    const { year, month } = req.dateInfo ?? { year: '', month: '' }

    const baseMediaUrl = process.env.MEDIA_BASE_URL ?? ''

    return res.json({
      nickname,
      username,
      year,
      month,
      id: userId,
      avatar: avatar ? `${baseMediaUrl}/${avatar}` : null,
      bio,
      header: header ? `${baseMediaUrl}/${header}` : null,
      email,
      followersCount,
      followingCount,
    })
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}

export const changeProfileInfo = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const { preview, previewHeader, nickname, bio } = req.body as Record<string, unknown>

    const user = await User.findById(userId)
    if (!user) {
      throw new Error('This user does not exist')
    }

    const updateFields: Record<string, unknown> = {}

    if (typeof nickname === 'string' && nickname.trim() && nickname !== user.nickname) {
      updateFields.nickname = nickname.trim()
    }

    if (typeof bio === 'string' && bio !== user.bio) {
      updateFields.bio = bio
    }

    if (typeof preview === 'string' && preview && preview !== user.avatar) {
      updateFields.avatar = preview
    }

    if (typeof previewHeader === 'string' && previewHeader && previewHeader !== user.header) {
      updateFields.header = previewHeader
    }

    if (Object.keys(updateFields).length === 0) {
      return res.status(200).json({ message: 'Nothing to update' })
    }

    const updated = await User.findByIdAndUpdate(userId, updateFields, { new: true })

    return res.status(200).json(updated)
  } catch (err) {
    return res.status(400).json({ error: err instanceof Error ? err.message : err })
  }
}

export const deleteAccount = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id
    if (!userId) {
      throw new Error('Unauthorized')
    }

    const user = await User.findById(userId).lean()
    if (!user) {
      throw new Error('User does not exist')
    }

    res.clearCookie('token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    })

    await Tweet.deleteMany({ authorId: userId })
    await User.findByIdAndDelete(userId)

    return res.status(200).json({ message: `${user.nickname}'s account has been deleted` })
  } catch (err) {
    return res.status(400).json({ message: `Error while deleting profile: ${err instanceof Error ? err.message : err}` })
  }
}
