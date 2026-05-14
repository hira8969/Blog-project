import { useSearchParams } from "react-router-dom";
import BlogCard from "../components/BlogCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import useBlogs from "../hooks/useBlogs.js";

export default function SearchResults() {
  const [params] = useSearchParams();
  const q = params.get("q") || "";
  const { blogs } = useBlogs({ q });
  return (
    <PageTransition className="mx-auto max-w-7xl px-4">
      <h1 className="text-4xl font-black sm:text-6xl">Search results</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">Showing matches for “{q}”.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}</div>
    </PageTransition>
  );
}
