import { ImagePlus, Save } from "lucide-react";
import RichTextEditor from "../../components/RichTextEditor.jsx";

export default function BlogEditor({ form, setForm, onSubmit, submitLabel = "Publish" }) {
  return (
    <form onSubmit={onSubmit} className="glass rounded-[2rem] p-5 sm:p-8">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <input className="input text-xl font-black" placeholder="Blog title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className="input" placeholder="Cover image URL" value={form.coverImage} onChange={(e) => setForm({ ...form, coverImage: e.target.value })} />
      </div>
      <textarea className="input mt-4 min-h-24" placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required />
      <div className="mt-4"><RichTextEditor value={form.content} onChange={(content) => setForm({ ...form, content })} /></div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2"><input className="input" placeholder="Tags: design, react, product" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} /><select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="published">Published</option><option value="draft">Draft</option></select></div>
      <div className="mt-6 flex flex-wrap gap-3"><button className="btn-primary"><Save size={18} />{submitLabel}</button><span className="btn-ghost"><ImagePlus size={18} />Cloudinary-ready uploads</span></div>
    </form>
  );
}
