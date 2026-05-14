import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true, index: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null, index: true },
    body: { type: String, required: true, maxlength: 1000 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    edited: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);
