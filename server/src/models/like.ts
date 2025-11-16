// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema.Types;

// const likeSchema = new mongoose.Schema(
//     {
//         tweetId: {
//             type: ObjectId, ref: "Tweet", required: true, index: true,
//         },
//         userId: {
//             type: ObjectId, ref: "User", required: true, index: true,
//         },
//     },
//     { timestamps: { createdAt: true, updatedAt: false } }
// );


// export default mongoose.models.Like || mongoose.model("Like", likeSchema);