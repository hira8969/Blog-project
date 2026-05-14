import { Eye, Trash2 } from "lucide-react";
import PageTransition from "../../components/PageTransition.jsx";
import useBlogs from "../../hooks/useBlogs.js";

export default function ManageBlogs() {
  const { blogs } = useBlogs({ limit: 8 });
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Manage Blogs</h1><div className="grid gap-4">{blogs.map((blog) => <div key={blog._id} className="glass flex items-center justify-between rounded-[1.5rem] p-4"><div><h2 className="font-black">{blog.title}</h2><p className="text-sm text-slate-500">By {blog.author?.name}</p></div><div className="flex gap-2"><button className="btn-ghost"><Eye size={16} />Review</button><button className="btn-ghost"><Trash2 size={16} />Remove</button></div></div>)}</div></PageTransition>;
}
