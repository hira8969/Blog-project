import { Bookmark, Heart, MessageCircle, Send, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition.jsx";
import api from "../services/api.js";
import { demoBlogs, formatDate } from "../utils/helpers.js";

export default function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [body, setBody] = useState("");
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    api
      .get(`/blogs/${slug}`)
      .then(({ data }) => {
        setBlog(data.blog);
        setComments(data.comments || []);
        setLikesCount(data.blog.likes?.length || 0);
        if (user) {
          setLiked(data.blog.likes?.some((id) => id === user._id || id?._id === user._id));
        }
      })
      .catch(() => {
        const fallback = demoBlogs.find((item) => item.slug === slug) || demoBlogs[0];
        setBlog(fallback);
        setLikesCount(fallback.likes?.length || 0);
      });
  }, [slug, user]);

  const handleLike = async () => {
    if (!user) { toast.error("Login required"); return; }
    try {
      const { data } = await api.post(`/blogs/${blog._id}/like`);
      setLiked(data.liked);
      setLikesCount(data.likes);
    } catch {
      toast.error("Could not toggle like");
    }
  };

  const handleBookmark = async () => {
    if (!user) { toast.error("Login required"); return; }
    try {
      const { data } = await api.post(`/blogs/${blog._id}/bookmark`);
      setBookmarked(data.bookmarked);
      toast.success(data.bookmarked ? "Saved to bookmarks" : "Removed from bookmarks");
    } catch {
      toast.error("Could not toggle bookmark");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: blog.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => toast.success("Link copied"));
    }
  };

  const addComment = async (event) => {
    event.preventDefault();
    if (!body.trim()) return;
    if (!user) { toast.error("Login required to comment"); return; }
    try {
      const { data } = await api.post("/comments", { blog: blog._id, body });
      setComments((items) => [...items, data.comment]);
      setBody("");
      toast.success("Comment added");
    } catch {
      toast.error("Could not post comment");
    }
  };

  if (!blog) {
    return (
      <PageTransition className="mx-auto max-w-5xl px-4">
        <div className="skeleton h-96 rounded-[2rem]" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <article className="mx-auto max-w-5xl px-4">
        <div className="glass overflow-hidden rounded-[2.5rem]">
          <img src={blog.coverImage?.url} alt={blog.title} className="h-[28rem] w-full object-cover" />
          <div className="p-6 sm:p-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-slate-500">
              {blog.category?.name && <span>{blog.category.name}</span>}
              <span>{formatDate(blog.createdAt)}</span>
              <span>{blog.readingTime} min read</span>
              <span>{blog.views} views</span>
            </div>
            <h1 className="mt-4 text-4xl font-black leading-tight sm:text-6xl">{blog.title}</h1>
            <p className="mt-5 text-xl leading-8 text-slate-600 dark:text-slate-300">{blog.excerpt}</p>
            <Link to={`/authors/${blog.author?._id}`} className="mt-6 flex items-center gap-3">
              <img src={blog.author?.avatar?.url} className="h-12 w-12 rounded-full object-cover" alt={blog.author?.name} />
              <div>
                <p className="font-black">{blog.author?.name}</p>
                <p className="text-sm text-slate-500">{blog.author?.bio}</p>
              </div>
            </Link>
            <div className="my-8 flex flex-wrap gap-3">
              <button
                className={`btn-ghost ${liked ? "text-coral" : ""}`}
                onClick={handleLike}
                aria-label="Like"
              >
                <Heart size={18} fill={liked ? "currentColor" : "none"} />
                {likesCount} Like{likesCount !== 1 ? "s" : ""}
              </button>
              <button
                className={`btn-ghost ${bookmarked ? "text-aura" : ""}`}
                onClick={handleBookmark}
                aria-label="Bookmark"
              >
                <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
                {bookmarked ? "Saved" : "Save"}
              </button>
              <button className="btn-ghost" onClick={handleShare} aria-label="Share">
                <Share2 size={18} />Share
              </button>
            </div>
            {blog.tags?.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-white/10 dark:text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            <div
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: blog.content || `<p>${blog.excerpt}</p>` }}
            />
          </div>
        </div>
      </article>
      <section className="mx-auto mt-8 max-w-5xl px-4">
        <div className="glass rounded-[2rem] p-6">
          <h2 className="flex items-center gap-2 text-2xl font-black">
            <MessageCircle />Conversation ({comments.length})
          </h2>
          {user ? (
            <form onSubmit={addComment} className="mt-5 flex gap-3">
              <input
                className="input flex-1"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Add a thoughtful comment"
                maxLength={1000}
              />
              <button className="btn-primary !px-4" aria-label="Send">
                <Send size={18} />
              </button>
            </form>
          ) : (
            <p className="mt-4 text-sm text-slate-500">
              <Link to="/login" className="font-bold text-aura">Login</Link> to join the conversation.
            </p>
          )}
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
