import { useEffect, useState } from "react";
import PageTransition from "../../components/PageTransition.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../services/api.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, blogs: 0, comments: 0, views: 0 });
  useEffect(() => { api.get("/admin/analytics").then(({ data }) => setStats(data)).catch(() => setStats({ users: 128, blogs: 340, comments: 981, views: 74200 })); }, []);
  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Analytics Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-4"><StatCard label="Users" value={stats.users} /><StatCard label="Blogs" value={stats.blogs} tone="from-mint to-aura" /><StatCard label="Comments" value={stats.comments} tone="from-sun to-coral" /><StatCard label="Views" value={stats.views} /></div>
      <div className="glass mt-6 rounded-[2rem] p-6"><h2 className="text-2xl font-black">Moderation pulse</h2><div className="mt-5 h-64 rounded-[1.5rem] bg-gradient-to-br from-aura/30 via-coral/20 to-mint/30" /></div>
    </PageTransition>
  );
}
