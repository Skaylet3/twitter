import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const tweetSchema = new mongoose.Schema(
  {
    authorId: {
      type: ObjectId, ref: "User", required: true, index: true,
     },
    content: {
      type: String, default: "",
    },
    image: {
      type: String, default: ""
    },
    //wires of replies
    inReplyTo: {
      type: ObjectId, ref: "Tweet", default: null, index: true,
    },
    rootId: {
      type: ObjectId, ref: "Tweet", default: null, index: true,
    },
    //counters
    likeCount: {
      type: Number, default: 0, index: true,
    },
    replyCount: {
      type: Number, default: 0, index: true,
    },
  },
  { timestamps: true }
);


export default mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);