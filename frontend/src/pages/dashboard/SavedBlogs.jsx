import BlogCard from "../../components/BlogCard.jsx";
import PageTransition from "../../components/PageTransition.jsx";
import useBlogs from "../../hooks/useBlogs.js";

export default function SavedBlogs() {
  const { blogs } = useBlogs({ limit: 6 });
  return <PageTransition><h1 className="mb-6 text-4xl font-black">Saved Blogs</h1><div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div></PageTransition>;
}
