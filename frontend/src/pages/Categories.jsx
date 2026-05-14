import { Code2, Palette, Rocket, Sparkles } from "lucide-react";
import PageTransition from "../components/PageTransition.jsx";

const cats = [
  ["Design", "Interfaces, typography, UX rituals", Palette, "from-coral to-aura"],
  ["Engineering", "Architecture, APIs, shipping systems", Code2, "from-mint to-aura"],
  ["Startups", "Growth, strategy, founder notes", Rocket, "from-sun to-coral"],
  ["AI", "Models, agents, product thinking", Sparkles, "from-aura to-mint"]
];

export default function Categories() {
  return (
    <PageTransition className="mx-auto max-w-7xl px-4">
      <h1 className="text-4xl font-black sm:text-6xl">Categories</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {cats.map(([name, copy, Icon, gradient]) => (
          <div key={name} className="glass rounded-[2rem] p-7 transition hover:-translate-y-1">
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${gradient} text-white`}><Icon /></div>
            <h2 className="mt-5 text-2xl font-black">{name}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{copy}</p>
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
