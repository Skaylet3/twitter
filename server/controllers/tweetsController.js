import Tweet from "../models/tweet.js";
import User from "../models/user.js";
import mongoose from "mongoose";
//exact time calculator
function getExactDateParts(createdAt, timeZone) { 
  const d = new Date(createdAt);

  const timeFmt  = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone });
  const dayFmt   = new Intl.DateTimeFormat('en-US', { day: 'numeric', timeZone });
  const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone });
  const yearFmt  = new Intl.DateTimeFormat('en-US', { year: 'numeric', timeZone });

  // "11:43 PM" -> "11:43pm"
  const time = timeFmt.format(d).replace(/\s/g, ' ').toUpperCase();

  return {
    time,                     // e.g. "11:43pm"
    day: dayFmt.format(d),    // e.g. "13"
    month: monthFmt.format(d),// e.g. "Aug"
    year: yearFmt.format(d),  // e.g. "2025"
  };
}

//date calculator
function getTimeAgo(createdAt, now) {
  const diff = Math.floor((now - new Date(createdAt)) / 1000); // seconds
  if (diff === 0) return `now`;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export const getTweets = async (req, res) => {
    try {
        //getting all stuff
        const limit = Math.min(parseInt(req.query.limit, 10) || 10, 10);
        const { cursor, onlyRoots, repliesTo } = req.query;

        console.log("Donald Trump", repliesTo);

        //filter, tweets requirements
        const q = {};
        if(onlyRoots === "true") q.inReplyTo = null;

        //for replies
        if(repliesTo) q.inReplyTo = repliesTo;

        //the last tweet checking
        if(cursor) {
            try {
                q._id = { $lt: new mongoose.Types.ObjectId(cursor) };
            } catch {
            return res.status(400).json({ error: "Invalid cursor" });
            }
        }

        //getting tweets
        const items = await Tweet.find(q)
            .sort({ _id: -1 })
            .limit(limit)
            .populate("authorId", "username nickname avatar")
            .lean();

        const now = Date.now();

        const BASE_MEDIA_URL = process.env.MEDIA_BASE_URL;

        //date calculating
        const withExtras = items.map(tweet => ({
            _id: tweet._id,
            content: tweet.content,
            image: tweet.image ? `${BASE_MEDIA_URL}/${tweet.image}` : null,
            likeCount: tweet.likeCount,
            replyCount: tweet.replyCount,
            createdAt: tweet.createdAt,
            timeAgo: getTimeAgo(tweet.createdAt, now),
            author: {
                username: tweet.authorId.username,
                nickname: tweet.authorId.nickname,
                avatar: `${BASE_MEDIA_URL}/${tweet.authorId.avatar}`,
            }
        }));

        res.json({
            items: withExtras,
            nextCursor: items.length ? String(items[items.length - 1]._id) : null,
        });
    } catch(err) {
        res.status(500).json({ error: "Error while getting tweets", details: err.message });
    } 
};

export const getParentTweet = async (req, res) => {
    try{   
        const { tweetId } = req.params;
        console.log(tweetId);

        const tweet = await Tweet.findById(tweetId).lean().populate("authorId", "nickname username avatar");
        if(!tweet) throw new Error("This tweet does not exist");
        console.log(tweet);
        if(!tweet.authorId) throw new Error("There is no authorId in the tweet");

        const z = 'Europe/Brussels';
        const now = Date.now();

        //exact time calculating
        const exact = getExactDateParts(tweet.createdAt, z);

        const BASE_MEDIA_URL = process.env.MEDIA_BASE_URL;

        //date calculating
        const withExtras = {
            _id: tweet._id,
            content: tweet.content,
            image: `${BASE_MEDIA_URL}/${tweet.image}`,
            likeCount: tweet.likeCount,
            replyCount: tweet.replyCount,
            createdAt: tweet.createdAt,
            timeAgo: getTimeAgo(tweet.createdAt, now),
            exactTime: exact.time,
            exactDay: exact.day,
            exactMonth: exact.month,
            exactYear: exact.year,
            author: {
                username: tweet.authorId.username,
                nickname: tweet.authorId.nickname,
                avatar: `${BASE_MEDIA_URL}/${tweet.authorId.avatar}`,
            }
        };

        res.status(200).json({ 
            tweet: withExtras
         });
    }catch(err){
        res.status(401).json({ error: err.message });
    }
}; 

export const createTweet = async (req, res) => {
    try{
        const { content, image, inReplyTo } = req.body;
        console.log("inreplyto: ", req.body);
        const authorId = req.user.id;

        const user = await User.findById(authorId);
        if(!user) throw new Error("User does not exist");

        const { nickname, username, avatar } = user;

        let rootId = null;

        console.log("Lady Gaga: ", inReplyTo);

        if(inReplyTo){
            const parentTweet = await Tweet.findById(inReplyTo);
            if(!parentTweet) throw new Error("That tweet does not exist");
            console.log("Brad Pitt: ", parentTweet);

            rootId = parentTweet.rootId || parentTweet._id;
            console.log("Jared Leto: ", rootId);

            await Tweet.findByIdAndUpdate(inReplyTo, {
                $inc: { replyCount: 1 },
            });

        }

        const newTweet = await Tweet.create({
            content,
            image,
            authorId,
            rootId, 
            inReplyTo,
        });

        const now = Date.now();
        
        const timeAgo = getTimeAgo(newTweet.createdAt, now);

        res.status(201).json({ message: "Tweet created successfuly", 
            ...newTweet.toObject(), 
            timeAgo, 
            author: {
                username,
                nickname,
                avatar,
            } });
    }catch(err){
        res.status(401).json({ error: err.message });
    }
};

// Recursive deletion function for replies
const deleteRepliesRecursively = async (parentId) => {
  const replies = await Tweet.find({ inReplyTo: parentId });

  for (const reply of replies) {
    await deleteRepliesRecursively(reply._id);
    await reply.deleteOne();
  }
};

export const deleteTweet = async (req, res) => {
    try{
        const { tweetId } = req.params;

        const tweet = await Tweet.findById(tweetId);
        if(!tweet) throw new Error("Tweet does not exist");

        if(tweet.inReplyTo){
            await Tweet.findByIdAndUpdate(tweet.inReplyTo, {
                $inc: { replyCount: -1 },
            });
        }

        await deleteRepliesRecursively(tweet._id);

        await tweet.deleteOne();

        res.status(201).json({ message: "Tweet deleted successfuly" });
    }catch(err){
        res.status(401).json({ error: err.message });
    }
};

export const updateTweet = async (req, res) => {
      try {
        console.log("Ya niger");
        const { tweetId } = req.params;
        const { content } = req.body;
        const userId = req.user.id;
        console.log("Updating of the tweet id: ", tweetId, "Next one is content: ", content, "And user id: ", userId);

        if(!tweetId) throw new Error("There's no tweetId in query");

        const tweet = await Tweet.findById(tweetId);
        if(!tweet) throw new Error("This tweet does not exist");
        console.log("This is the tweet: ", tweet._id);

        if(tweet.authorId.toString() !== userId) throw new Error("You cannot update someone's else tweet");
        console.log("Suchka niger: ", tweet.authorId);

        if (typeof content === "string" && content !== tweet.content) {
            tweet.content = content;
        }

        const updated = await tweet.save();
        console.log("suchka kuchka", updated);

        res.status(201).json({updated});
    } catch(err) {
        res.status(401).json({ error: err.message });
    }
};