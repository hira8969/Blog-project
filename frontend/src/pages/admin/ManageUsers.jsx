import { ShieldCheck, Trash2 } from "lucide-react";
import PageTransition from "../../components/PageTransition.jsx";

export default function ManageUsers() {
  const users = ["Ava Sterling", "Noah Vale", "Mira Chen", "Sam Rivera"];
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Manage Users</h1><div className="glass rounded-[2rem] p-5">{users.map((user) => <div key={user} className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"><div><p className="font-black">{user}</p><p className="text-sm text-slate-500">creator@lumina.dev</p></div><div className="flex gap-2"><button className="btn-ghost"><ShieldCheck size={16} />Role</button><button className="btn-ghost"><Trash2 size={16} />Delete</button></div></div>)}</div></PageTransition>;
}
