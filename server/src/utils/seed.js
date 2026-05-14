import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Blog from "../models/Blog.js";
import Category from "../models/Category.js";
import User from "../models/User.js";

dotenv.config();
await connectDB();

await Promise.all([User.deleteMany(), Blog.deleteMany(), Category.deleteMany()]);

const admin = await User.create({
  name: "Ava Sterling",
  email: "admin@lumina.dev",
  password: "password123",
  role: "admin",
  bio: "Editor-in-chief at Lumina. Obsessed with humane technology and luminous prose."
});

const cats = await Category.insertMany([
  { name: "Design", color: "#fb7185", icon: "PenTool" },
  { name: "Engineering", color: "#2dd4bf", icon: "Code2" },
  { name: "Startups", color: "#f59e0b", icon: "Rocket" },
  { name: "AI", color: "#7c3aed", icon: "Sparkles" }
]);

await Blog.insertMany([
  {
    title: "Designing Interfaces That Feel Quietly Expensive",
    excerpt: "A practical guide to contrast, rhythm, animation, and visual restraint in premium product UI.",
    content: "<p>Premium interfaces are built from thousands of small decisions: spacing that breathes, motion that clarifies, and copy that respects attention.</p><p>Start with hierarchy, then add delight only where it helps the user move.</p>",
    author: admin._id,
    category: cats[0]._id,
    tags: ["ux", "product", "visual-design"],
    featured: true,
    views: 1530,
    coverImage: { url: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80" }
  },
  {
    title: "The Full-Stack Playbook for Fast Startup Teams",
    excerpt: "How to structure product code so small teams can ship quickly without making tomorrow miserable.",
    content: "<p>Great startup architecture keeps the product malleable. Use clear boundaries, boring data flows, and carefully chosen abstractions.</p>",
    author: admin._id,
    category: cats[1]._id,
    tags: ["full-stack", "architecture", "startup"],
    views: 2310,
    coverImage: { url: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1400&q=80" }
  },
  {
    title: "AI Notes From a Product Builder",
    excerpt: "The best AI products do not show off the model; they create a crisp moment of user relief.",
    content: "<p>AI should feel like leverage. The product job is to shape uncertainty into useful, inspectable outcomes.</p>",
    author: admin._id,
    category: cats[3]._id,
    tags: ["ai", "product", "strategy"],
    views: 1980,
    coverImage: { url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80" }
  }
]);

console.log("Seed complete. Login with admin@lumina.dev / password123");
process.exit(0);
