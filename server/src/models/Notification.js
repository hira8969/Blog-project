import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    actor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["like", "comment", "follow", "bookmark", "system"], default: "system" },
    message: { type: String, required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    read: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Notification", notificationSchema);
