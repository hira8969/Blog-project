import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";
import BlogEditor from "./BlogEditor.jsx";

export default function CreateBlog() {
  const [form, setForm] = useState({ title: "", excerpt: "", content: "", tags: "", status: "published", coverImage: "" });
  const navigate = useNavigate();
  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.post("/blogs", form);
      toast.success("Blog published");
      navigate(`/blogs/${data.blog.slug}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not publish");
    }
  };
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Create Blog</h1><BlogEditor form={form} setForm={setForm} onSubmit={submit} /></PageTransition>;
}
