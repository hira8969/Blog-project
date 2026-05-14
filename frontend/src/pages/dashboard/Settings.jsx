import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition.jsx";

export default function Settings() {
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Settings</h1><form className="glass grid gap-4 rounded-[2rem] p-6" onSubmit={(e) => { e.preventDefault(); toast.success("Settings saved"); }}><input className="input" placeholder="Display name" /><textarea className="input min-h-32" placeholder="Bio" /><input className="input" placeholder="Website URL" /><button className="btn-primary w-fit">Save settings</button></form></PageTransition>;
}
