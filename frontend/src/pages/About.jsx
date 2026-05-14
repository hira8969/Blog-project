import PageTransition from "../components/PageTransition.jsx";

export default function About() {
  return (
    <PageTransition className="mx-auto max-w-5xl px-4">
      <div className="glass rounded-[2.5rem] p-8 sm:p-12">
        <p className="font-black uppercase text-mint">About Lumina</p>
        <h1 className="mt-3 text-4xl font-black sm:text-6xl">A publishing home that feels alive.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">Lumina blends Medium-style reading, Dev.to-style community, and SaaS-grade dashboards into one expressive full-stack platform. It includes authentication, profiles, comments, moderation, analytics, bookmarks, categories, and a responsive animated interface.</p>
      </div>
    </PageTransition>
  );
}
