import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "../../components/PageTransition.jsx";
import api from "../../services/api.js";
import BlogEditor from "./BlogEditor.jsx";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing blog by searching through mine endpoint
    api
      .get("/blogs/mine")
      .then(({ data }) => {
        const blog = data.blogs?.find((b) => b._id === id);
        if (!blog) throw new Error("Not found");
        setForm({
          title: blog.title || "",
          excerpt: blog.excerpt || "",
          content: blog.content || "",
          tags: blog.tags?.join(", ") || "",
          status: blog.status || "published",
          coverImage: blog.coverImage?.url || ""
        });
      })
      .catch(() => {
        toast.error("Could not load blog");
        navigate("/dashboard/my-blogs");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const submit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await api.patch(`/blogs/${id}`, form);
      toast.success("Blog updated");
      navigate(`/blogs/${data.blog.slug}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not update blog");
    }
  };

  if (loading) {
    return (
      <PageTransition>
        <div className="skeleton h-[500px] rounded-[2rem]" />
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <h1 className="mb-6 text-4xl font-black">Edit Blog</h1>
      {form && <BlogEditor form={form} setForm={setForm} submitLabel="Save changes" onSubmit={submit} />}
    </PageTransition>
  );
}
