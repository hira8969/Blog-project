import { Bookmark, Heart, MessageCircle, Send, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import api from "../services/api.js";
import { demoBlogs, formatDate } from "../utils/helpers.js";

export default function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");

  useEffect(() => {
    api.get(`/blogs/${slug}`).then(({ data }) => {
      setBlog(data.blog);
      setComments(data.comments || []);
    }).catch(() => setBlog(demoBlogs.find((item) => item.slug === slug) || demoBlogs[0]));
  }, [slug]);

  const addComment = async (event) => {
    event.preventDefault();
    if (!body.trim()) return;
    try {
      const { data } = await api.post("/comments", { blog: blog._id, body });
      setComments((items) => [...items, data.comment]);
      setBody("");
      toast.success("Comment added");
    } catch {
      toast.error("Login required to comment");
    }
  };

  if (!blog) return <PageTransition className="mx-auto max-w-5xl px-4"><div className="skeleton h-96 rounded-[2rem]" /></PageTransition>;

  return (
    <PageTransition>
      <article className="mx-auto max-w-5xl px-4">
        <div className="glass overflow-hidden rounded-[2.5rem]">
          <img src={blog.coverImage?.url} alt={blog.title} className="h-[28rem] w-full object-cover" />
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500">
              <span>{blog.category?.name}</span><span>{formatDate(blog.createdAt)}</span><span>{blog.readingTime} min read</span>
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{blog.title}</h1>
            <p className="mt-5 text-xl leading-8 text-slate-600 dark:text-slate-300">{blog.excerpt}</p>
            <Link to={`/authors/${blog.author?._id}`} className="mt-6 flex items-center gap-3">
              <img src={blog.author?.avatar?.url} className="h-12 w-12 rounded-full object-cover" alt={blog.author?.name} />
              <div><p className="font-black">{blog.author?.name}</p><p className="text-sm text-slate-500">{blog.author?.bio}</p></div>
            </Link>
            <div className="my-8 flex flex-wrap gap-3">
              <button className="btn-ghost" onClick={() => api.post(`/blogs/${blog._id}/like`).then(() => toast.success("Liked")).catch(() => toast.error("Login required"))}><Heart size={18} />Like</button>
              <button className="btn-ghost" onClick={() => api.post(`/blogs/${blog._id}/bookmark`).then(() => toast.success("Saved")).catch(() => toast.error("Login required"))}><Bookmark size={18} />Save</button>
              <button className="btn-ghost" onClick={() => navigator.share?.({ title: blog.title, url: location.href }) || navigator.clipboard.writeText(location.href).then(() => toast.success("Link copied"))}><Share2 size={18} />Share</button>
            </div>
            <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }} />
          </div>
        </div>
      </article>
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="glass rounded-[2rem] p-6">
          <h2 className="flex items-center gap-2 text-2xl font-black"><MessageCircle />Conversation</h2>
          <form onSubmit={addComment} className="mt-5 flex gap-3">
            <input className="input" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Add a thoughtful comment" />
            <button className="btn-primary !px-4" aria-label="Send"><Send size={18} /></button>
          </form>
          <div className="mt-6 grid gap-3">
            {comments.map((comment) => (
              <div key={comment._id} className="rounded-2xl bg-white/45 p-4 dark:bg-white/5">
                <p className="font-bold">{comment.author?.name || "Reader"}</p>
                <p className="mt-1 text-slate-600 dark:text-slate-300">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
