import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BlogCard from "../../components/BlogCard.jsx";
import PageTransition from "../../components/PageTransition.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";
import api from "../../services/api.js";

export default function SavedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/blogs/saved")
      .then(({ data }) => setBlogs(data.blogs || []))
      .catch(() => toast.error("Could not load saved blogs"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Saved Blogs</h1>
      {loading ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass rounded-[2rem] p-10 text-center">
          <p className="text-lg font-bold text-slate-500">No saved blogs yet. Bookmark stories you love!</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}
        </div>
      )}
    </PageTransition>
  );
}
