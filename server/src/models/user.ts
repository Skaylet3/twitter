import { Schema, model, type Document, type Model } from 'mongoose'

export interface IUser extends Document {
  nickname: string
  username: string
  email: string
  passwordHash: string
  avatar: string
  header: string
  bio: string
  followersCount: number
  followingCount: number
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    nickname: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    avatar: { type: String, default: 'avatars/default.png' },
    header: { type: String, default: 'headers/default.png' },
    bio: { type: String, default: '' },
    followersCount: { type: Number, default: 0 },
    followingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash
    return ret
  },
})

const UserModel: Model<IUser> = model<IUser>('User', userSchema)

export default UserModel
