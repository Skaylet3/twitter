// import mongoose from "mongoose";
// const { ObjectId } = mongoose.Schema.Types;

// const followSchema = new mongoose.Schema(
//     {
//         followerId: {
//             type: ObjectId, ref: "User", required: true, index: true,
//         },
//         followeeId: {
//             type: ObjectId, ref: "User", required: true, index: true,
//         }
//     },
//     { timestamps: { createdAt: true, updatedAt: false } }
// );


// export default mongoose.models.Follow || mongoose.model("Follow", followSchema);