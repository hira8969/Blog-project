import { motion } from "framer-motion";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-10 px-4 pb-12 pt-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
      <div>
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black">
          <Sparkles size={16} /> Premium stories for sharp minds
        </motion.span>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-5xl font-black leading-[0.96] tracking-normal text-slate-950 dark:text-white sm:text-7xl lg:text-8xl">
          Lumina Blog Platform
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          Create, publish, discuss, bookmark, and discover brilliant writing inside a colorful full-stack product experience.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
          <Link to="/explore" className="btn-primary">Explore blogs <ArrowRight size={18} /></Link>
          <Link to="/trending" className="btn-ghost"><TrendingUp size={18} />Trending now</Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.94, rotate: -2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.7 }} className="relative">
        <div className="glass overflow-hidden rounded-[2.5rem] p-3 shadow-glow">
          <img className="h-[32rem] w-full rounded-[2rem] object-cover" src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80" alt="Creator workspace" />
          <div className="absolute bottom-8 left-8 right-8 glass rounded-[1.5rem] p-5">
            <p className="text-sm font-black uppercase text-coral">Live editorial pulse</p>
            <p className="mt-1 text-2xl font-black">42k reads this week</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
