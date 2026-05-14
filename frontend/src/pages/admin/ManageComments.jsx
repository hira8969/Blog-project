import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";

export default function ManageComments() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/comments")
      .then(({ data }) => setComments(data.comments || []))
      .catch(() => toast.error("Could not load comments"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${id}`);
      toast.success("Comment deleted");
      setComments((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Could not delete comment");
    }
  };

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Manage Comments</h1>
      <div className="glass rounded-[2rem] p-5">
        {loading ? (
          <p className="py-8 text-center text-slate-500">Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="py-8 text-center text-slate-500">No comments found.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-start justify-between gap-4 border-b border-white/10 py-4 last:border-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-sm">
                  <img src={comment.author?.avatar?.url} alt={comment.author?.name} className="h-6 w-6 rounded-full object-cover" />
                  <span className="font-bold">{comment.author?.name || "Unknown"}</span>
                  {comment.blog && (
                    <Link to={`/blogs/${comment.blog.slug}`} className="text-aura hover:underline truncate">
                      on: {comment.blog.title}
                    </Link>
                  )}
                </div>
                <p className="mt-2 text-slate-600 dark:text-slate-300">{comment.body}</p>
              </div>
              <button className="btn-ghost flex-shrink-0" onClick={() => handleDelete(comment._id)}>
                <Trash2 size={16} />Delete
              </button>
            </div>
          ))
        )}
      </div>
    </PageTransition>
  );
}
