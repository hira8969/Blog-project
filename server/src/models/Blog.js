import mongoose from "mongoose";
import slugify from "slugify";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160, index: "text" },
    slug: { type: String, unique: true, index: true },
    excerpt: { type: String, required: true, maxlength: 260 },
    content: { type: String, required: true },
    coverImage: {
      url: { type: String, default: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80" },
      publicId: String
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", index: true },
    tags: [{ type: String, trim: true, lowercase: true }],
    status: { type: String, enum: ["draft", "published"], default: "published", index: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    views: { type: Number, default: 0 },
    readingTime: { type: Number, default: 1 },
    featured: { type: Boolean, default: false },
    reports: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, reason: String }]
  },
  { timestamps: true }
);

blogSchema.index({ title: "text", excerpt: "text", content: "text", tags: "text" });

blogSchema.pre("validate", function makeSlug(next) {
  if (this.isModified("title")) {
    const suffix = this._id ? `-${String(this._id).slice(-6)}` : "";
    this.slug = `${slugify(this.title, { lower: true, strict: true })}${suffix}`;
  }
  if (this.isModified("content")) {
    const words = this.content.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
    this.readingTime = Math.max(1, Math.ceil(words / 220));
  }
  next();
});

export default mongoose.model("Blog", blogSchema);
