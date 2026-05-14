import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import BlogCard from "../components/BlogCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import useBlogs from "../hooks/useBlogs.js";

export default function Explore() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("latest");
  const { blogs, loading } = useBlogs({ q: query, sort, limit: 12 });
  return (
    <PageTransition className="mx-auto max-w-7xl px-4">
      <div className="glass mb-8 rounded-[2rem] p-5 sm:p-7">
        <h1 className="text-4xl font-black sm:text-6xl">Explore Blogs</h1>
        <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
          <label className="input flex items-center gap-3"><Search size={18} /><input className="w-full bg-transparent outline-none" placeholder="Search by title, tag, or idea" value={query} onChange={(e) => setQuery(e.target.value)} /></label>
          <label className="input flex items-center gap-3 md:w-64"><SlidersHorizontal size={18} /><select className="w-full bg-transparent outline-none" value={sort} onChange={(e) => setSort(e.target.value)}><option value="latest">Latest</option><option value="trending">Trending</option><option value="popular">Popular</option></select></label>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />) : blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
      </div>
    </PageTransition>
  );
}
