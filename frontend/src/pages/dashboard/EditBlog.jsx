import { useState } from "react";
import toast from "react-hot-toast";
import PageTransition from "../../components/PageTransition.jsx";
import BlogEditor from "./BlogEditor.jsx";

export default function EditBlog() {
  const [form, setForm] = useState({ title: "Refine your existing story", excerpt: "Update the excerpt and publish a cleaner version.", content: "<p>Edit mode is wired to the same reusable editor component.</p>", tags: "edit,blog", status: "draft", coverImage: "" });
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Edit Blog</h1><BlogEditor form={form} setForm={setForm} submitLabel="Save changes" onSubmit={(e) => { e.preventDefault(); toast.success("Changes saved"); }} /></PageTransition>;
}
