import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import api from "../services/api.js";
import { demoBlogs } from "../utils/helpers.js";

export default function AuthorProfile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    api.get(`/users/${id}`).then(({ data }) => { setProfile(data.user); setBlogs(data.blogs); }).catch(() => { setProfile(demoBlogs[0].author); setBlogs(demoBlogs); });
  }, [id]);
  if (!profile) return null;
  return (
    <PageTransition className="mx-auto max-w-7xl px-4">
      <div className="glass rounded-[2.5rem] p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <img src={profile.avatar?.url} alt={profile.name} className="h-24 w-24 rounded-full object-cover ring-4 ring-white/60" />
            <div><h1 className="text-4xl font-black">{profile.name}</h1><p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{profile.bio}</p></div>
          </div>
          <button className="btn-primary" onClick={() => api.post(`/users/${id}/follow`).then(() => toast.success("Following")).catch(() => toast.error("Login required"))}><UserPlus size={18} />Follow</button>
        </div>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
    </PageTransition>
  );
}
