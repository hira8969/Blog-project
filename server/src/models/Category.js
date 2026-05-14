import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    slug: { type: String, unique: true },
    description: String,
    color: { type: String, default: "#7c3aed" },
    icon: { type: String, default: "Sparkles" }
  },
  { timestamps: true }
);

categorySchema.pre("validate", function makeSlug(next) {
  if (this.isModified("name")) this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export default mongoose.model("Category", categorySchema);
