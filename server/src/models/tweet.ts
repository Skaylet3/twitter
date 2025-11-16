import { Schema, model, type Document, type Model, Types } from 'mongoose'

export interface ITweet extends Document {
  authorId: Types.ObjectId
  content: string
  image: string | null
  inReplyTo: Types.ObjectId | null
  rootId: Types.ObjectId | null
  likeCount: number
  replyCount: number
  createdAt: Date
  updatedAt: Date
}

const tweetSchema = new Schema<ITweet>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    content: { type: String, default: '' },
    image: { type: String, default: null },
    inReplyTo: { type: Schema.Types.ObjectId, ref: 'Tweet', default: null, index: true },
    rootId: { type: Schema.Types.ObjectId, ref: 'Tweet', default: null, index: true },
    likeCount: { type: Number, default: 0, index: true },
    replyCount: { type: Number, default: 0, index: true },
  },
  { timestamps: true }
)

const TweetModel: Model<ITweet> = model<ITweet>('Tweet', tweetSchema)

export default TweetModel
