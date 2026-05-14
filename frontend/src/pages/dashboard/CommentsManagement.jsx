import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";

export default function CommentsManagement() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/comments/manage")
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
      <h1 className="mb-6 text-4xl font-black">Comments</h1>
      <div className="glass rounded-[2rem] p-6">
        {loading ? (
          <p className="py-8 text-center text-slate-500">Loading…</p>
        ) : comments.length === 0 ? (
          <p className="py-8 text-center text-slate-500">You have not posted any comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="flex items-start justify-between gap-4 border-b border-white/10 py-4 last:border-0">
              <div className="flex-1">
                {comment.blog && (
                  <Link to={`/blogs/${comment.blog.slug}`} className="text-sm font-bold text-aura hover:underline">
                    {comment.blog.title}
                  </Link>
                )}
                <p className="mt-1 text-slate-600 dark:text-slate-300">{comment.body}</p>
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
