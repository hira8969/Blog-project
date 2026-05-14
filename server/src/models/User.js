import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const socialSchema = new mongoose.Schema(
  {
    website: String,
    twitter: String,
    linkedin: String,
    github: String
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    password: { type: String, required: true, minlength: 6, select: false },
    avatar: {
      url: { type: String, default: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" },
      publicId: String
    },
    bio: { type: String, maxlength: 280, default: "Writing bright ideas for curious readers." },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    interests: [String],
    socials: socialSchema,
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = function matchPassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.toPublicJSON = function toPublicJSON() {
  const user = this.toObject();
  delete user.password;
  delete user.resetPasswordToken;
  delete user.resetPasswordExpires;
  return user;
};

export default mongoose.model("User", userSchema);
