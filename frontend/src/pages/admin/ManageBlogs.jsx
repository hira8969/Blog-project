import { Eye, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/blogs")
      .then(({ data }) => setBlogs(data.blogs || []))
      .catch(() => toast.error("Could not load blogs"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete blog "${title}"?`)) return;
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
      <h1 className="mb-6 text-4xl font-black">Manage Blogs</h1>
      <div className="grid gap-4">
        {loading ? (
          <p className="glass rounded-[2rem] py-10 text-center text-slate-500">Loading blogs…</p>
        ) : blogs.length === 0 ? (
          <p className="glass rounded-[2rem] py-10 text-center text-slate-500">No blogs found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="glass flex items-center justify-between gap-4 rounded-[1.5rem] p-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <img src={blog.coverImage?.url} alt={blog.title} className="h-14 w-20 flex-shrink-0 rounded-xl object-cover" />
                <div className="min-w-0">
                  <h2 className="truncate font-black">{blog.title}</h2>
                  <p className="text-sm text-slate-500">By {blog.author?.name} &middot; {blog.status}</p>
                  <p className="text-xs text-slate-400">{blog.views} views &middot; {blog.likes?.length || 0} likes</p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Link className="btn-ghost" to={`/blogs/${blog.slug}`} target="_blank" rel="noopener noreferrer">
                  <Eye size={16} />View
                </Link>
                <button className="btn-ghost" onClick={() => handleDelete(blog._id, blog.title)}>
                  <Trash2 size={16} />Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
