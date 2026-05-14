import { motion } from "framer-motion";
import { Bookmark, Clock3, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers.js";

export default function BlogCard({ blog, featured = false }) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`glass group overflow-hidden rounded-[2rem] ${featured ? "md:col-span-2" : ""}`}
    >
      <Link to={`/blogs/${blog.slug}`} className="block">
        <div className={`relative overflow-hidden ${featured ? "h-80" : "h-56"}`}>
          <img src={blog.coverImage?.url} alt={blog.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/85 px-3 py-1 text-xs font-black text-slate-900 backdrop-blur">
            <Sparkles size={14} />
            {blog.category?.name || "Featured"}
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            <span>{formatDate(blog.createdAt)}</span>
            <span className="inline-flex items-center gap-1"><Clock3 size={14} />{blog.readingTime || 4} min</span>
          </div>
          <h3 className="mt-3 text-2xl font-black leading-tight text-slate-950 dark:text-white">{blog.title}</h3>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{blog.excerpt}</p>
          <div className="mt-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={blog.author?.avatar?.url} alt={blog.author?.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-white/60" />
              <div>
                <p className="text-sm font-bold">{blog.author?.name || "Lumina Author"}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{blog.views || 0} views</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-slate-500">
              <span className="inline-flex items-center gap-1"><Heart size={17} />{blog.likes?.length || 0}</span>
              <Bookmark size={17} />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
