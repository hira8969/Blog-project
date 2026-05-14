import { Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";
import PageTransition from "../components/PageTransition.jsx";

export default function Contact() {
  return (
    <PageTransition className="mx-auto grid max-w-6xl gap-6 px-4 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="glass rounded-[2rem] p-7">
        <h1 className="text-4xl font-black">Contact</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-300">Questions, partnerships, or editorial notes.</p>
        <p className="mt-8 flex items-center gap-3"><Mail size={18} /> hello@lumina.dev</p>
        <p className="mt-4 flex items-center gap-3"><MapPin size={18} /> Remote-first</p>
      </div>
      <form className="glass rounded-[2rem] p-7" onSubmit={(e) => { e.preventDefault(); toast.success("Message sent"); }}>
        <div className="grid gap-4 sm:grid-cols-2"><input className="input" placeholder="Name" required /><input className="input" placeholder="Email" type="email" required /></div>
        <textarea className="input mt-4 min-h-40" placeholder="Message" required />
        <button className="btn-primary mt-4"><Send size={18} />Send message</button>
      </form>
    </PageTransition>
  );
}
