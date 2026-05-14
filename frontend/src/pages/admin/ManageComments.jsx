import { CheckCircle2, Trash2 } from "lucide-react";
import PageTransition from "../../components/PageTransition.jsx";

export default function ManageComments() {
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Manage Comments</h1><div className="glass rounded-[2rem] p-5">{["Insightful and practical.", "This needs moderation review.", "Can you add examples?"].map((comment) => <div key={comment} className="flex items-center justify-between border-b border-white/10 py-4 last:border-0"><p>{comment}</p><div className="flex gap-2"><button className="btn-ghost"><CheckCircle2 size={16} />Approve</button><button className="btn-ghost"><Trash2 size={16} />Delete</button></div></div>)}</div></PageTransition>;
}
