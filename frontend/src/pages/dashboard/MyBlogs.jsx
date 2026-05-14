import { Edit3, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import SkeletonCard from "../../components/SkeletonCard.jsx";
import api from "../../services/api.js";

export default function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyBlogs = () => {
    setLoading(true);
    api
      .get("/blogs/mine")
      .then(({ data }) => setBlogs(data.blogs || []))
      .catch(() => toast.error("Could not load your blogs"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog?")) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success("Blog deleted");
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Could not delete blog");
    }
  };

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">My Blogs</h1>
      {loading ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : blogs.length === 0 ? (
        <div className="glass rounded-[2rem] p-10 text-center">
          <p className="text-lg font-bold text-slate-500">You have not written any blogs yet.</p>
          <Link to="/dashboard/create" className="btn-primary mt-4 inline-flex">Write your first blog</Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {blogs.map((blog) => (
            <div className="glass flex flex-col gap-4 rounded-[1.5rem] p-4 sm:flex-row sm:items-center" key={blog._id}>
              <img
                src={blog.coverImage?.url}
                className="h-28 w-full rounded-2xl object-cover sm:w-40"
                alt={blog.title}
              />
              <div className="flex-1">
                <h2 className="text-xl font-black">{blog.title}</h2>
                <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{blog.excerpt}</p>
                <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold ${blog.status === "published" ? "bg-mint/20 text-mint" : "bg-sun/20 text-sun"}`}>
                  {blog.status}
                </span>
              </div>
              <Link className="btn-ghost" to={`/dashboard/edit/${blog._id}`}>
                <Edit3 size={16} />Edit
              </Link>
              <button className="btn-ghost" onClick={() => handleDelete(blog._id)}>
                <Trash2 size={16} />Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
