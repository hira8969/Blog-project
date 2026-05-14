import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import StatCard from "../../components/StatCard.jsx";

export default function UserDashboard() {
  return (
    <PageTransition>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><p className="font-black uppercase text-mint">Dashboard</p><h1 className="text-4xl font-black">Creator overview</h1></div>
        <Link to="/dashboard/create" className="btn-primary"><PenLine size={18} />New blog</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-4"><StatCard label="Published" value="12" /><StatCard label="Drafts" value="3" tone="from-mint to-aura" /><StatCard label="Comments" value="88" tone="from-sun to-coral" /><StatCard label="Views" value="24k" /></div>
      <div className="glass mt-6 rounded-[2rem] p-6"><h2 className="text-2xl font-black">Writing streak</h2><div className="mt-5 grid grid-cols-7 gap-2">{Array.from({ length: 35 }).map((_, i) => <span key={i} className={`h-9 rounded-xl ${i % 4 ? "bg-aura/30" : "bg-mint/60"}`} />)}</div></div>
    </PageTransition>
  );
}
