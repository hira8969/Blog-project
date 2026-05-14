import { Edit3, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import useBlogs from "../../hooks/useBlogs.js";

export default function MyBlogs() {
  const { blogs } = useBlogs({ limit: 8 });
  return (
    <PageTransition><h1 className="mb-6 text-4xl font-black">My Blogs</h1><div className="grid gap-4">{blogs.map((blog) => <div className="glass flex flex-col gap-4 rounded-[1.5rem] p-4 sm:flex-row sm:items-center" key={blog._id}><img src={blog.coverImage?.url} className="h-28 w-full rounded-2xl object-cover sm:w-40" /><div className="flex-1"><h2 className="text-xl font-black">{blog.title}</h2><p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{blog.excerpt}</p></div><Link className="btn-ghost" to={`/dashboard/edit/${blog._id}`}><Edit3 size={16} />Edit</Link><button className="btn-ghost"><Trash2 size={16} />Delete</button></div>)}</div></PageTransition>
  );
}
