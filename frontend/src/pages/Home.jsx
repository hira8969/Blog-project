import { Helmet } from "react-helmet-async";
import BlogCard from "../components/BlogCard.jsx";
import Hero from "../components/Hero.jsx";
import PageTransition from "../components/PageTransition.jsx";
import SkeletonCard from "../components/SkeletonCard.jsx";
import useBlogs from "../hooks/useBlogs.js";

export default function Home() {
  const { blogs, loading } = useBlogs({ limit: 6, sort: "trending" });
  return (
    <PageTransition>
      <Helmet><title>Lumina | Modern Blog Platform</title></Helmet>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="font-black uppercase text-coral">Editor's orbit</p>
            <h2 className="mt-2 text-3xl font-black sm:text-5xl">Stories with momentum</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {loading ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />) : blogs.map((blog, i) => <BlogCard key={blog._id} blog={blog} featured={i === 0} />)}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {["Cinematic writing tools", "Nested conversations", "Creator analytics"].map((item, i) => (
            <div key={item} className="glass rounded-[2rem] p-6" data-aos="fade-up" data-aos-delay={i * 80}>
              <p className="text-5xl font-black gradient-text">0{i + 1}</p>
              <h3 className="mt-4 text-xl font-black">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Premium interactions, responsive layouts, and production-ready full-stack architecture.</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
