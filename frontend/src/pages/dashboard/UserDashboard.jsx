import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../services/api.js";

export default function UserDashboard() {
  const [stats, setStats] = useState({ published: 0, drafts: 0, comments: 0, views: 0 });

  useEffect(() => {
    api.get("/blogs/mine").then(({ data }) => {
      const blogs = data.blogs || [];
      const published = blogs.filter((b) => b.status === "published").length;
      const drafts = blogs.filter((b) => b.status === "draft").length;
      const views = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
      setStats({ published, drafts, views, comments: stats.comments });
    }).catch(() => {});

    api.get("/comments/manage").then(({ data }) => {
      setStats((prev) => ({ ...prev, comments: data.comments?.length || 0 }));
    }).catch(() => {});
  }, []);

  // Generate a 35-day writing streak grid
  const streakDays = Array.from({ length: 35 }, (_, i) => i % 5 !== 0);

  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-black uppercase text-mint">Dashboard</p>
          <h1 className="text-4xl font-black">Creator overview</h1>
        </div>
        <Link to="/dashboard/create" className="btn-primary"><PenLine size={18} />New blog</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Published" value={stats.published} />
        <StatCard label="Drafts" value={stats.drafts} tone="from-mint to-aura" />
        <StatCard label="Comments" value={stats.comments} tone="from-sun to-coral" />
        <StatCard label="Views" value={stats.views >= 1000 ? `${(stats.views / 1000).toFixed(1)}k` : stats.views} />
      </div>
      <div className="glass mt-6 rounded-[2rem] p-6">
        <h2 className="text-2xl font-black">Quick actions</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <Link to="/dashboard/create" className="btn-ghost justify-start"><PenLine size={16} />Write new blog</Link>
          <Link to="/dashboard/my-blogs" className="btn-ghost justify-start">📝 Manage my blogs</Link>
          <Link to="/dashboard/saved" className="btn-ghost justify-start">🔖 Saved blogs</Link>
        </div>
      </div>
      <div className="glass mt-6 rounded-[2rem] p-6">
        <h2 className="text-2xl font-black">Writing streak</h2>
        <div className="mt-5 grid grid-cols-7 gap-2">
          {streakDays.map((active, i) => (
            <span
              key={i}
              title={`Day ${i + 1}`}
              className={`h-9 rounded-xl transition ${active ? "bg-mint/60" : "bg-aura/20"}`}
            />
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
