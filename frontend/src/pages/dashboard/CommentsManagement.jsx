import PageTransition from "../../components/PageTransition.jsx";

export default function CommentsManagement() {
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Comments</h1><div className="glass rounded-[2rem] p-6">{["Great read", "Can you expand on the architecture?", "Loved the animation ideas"].map((body) => <div className="border-b border-white/10 py-4 last:border-0" key={body}><p className="font-bold">{body}</p><p className="text-sm text-slate-500">Moderate, edit, or delete from the API-backed admin tools.</p></div>)}</div></PageTransition>;
}
