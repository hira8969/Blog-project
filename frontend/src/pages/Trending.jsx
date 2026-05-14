import { Flame } from "lucide-react";
import BlogCard from "../components/BlogCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import useBlogs from "../hooks/useBlogs.js";

export default function Trending() {
  const { blogs } = useBlogs({ sort: "trending", limit: 12 });
  return (
    <PageTransition className="mx-auto max-w-7xl px-4">
      <div className="mb-8">
        <p className="flex items-center gap-2 font-black uppercase text-coral"><Flame size={18} />Trending</p>
        <h1 className="mt-2 text-4xl font-black sm:text-6xl">Blogs catching fire</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{blogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} featured={i === 0} />)}</div>
    </PageTransition>
  );
}
