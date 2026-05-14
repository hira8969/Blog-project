import { motion } from "framer-motion";

export default function AuthShell({ title, subtitle, children }) {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-6xl items-center gap-8 px-4 lg:grid-cols-2">
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}>
        <p className="font-black uppercase text-coral">Creator access</p>
        <h1 className="mt-3 text-4xl font-black sm:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">{subtitle}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} className="glass rounded-[2rem] p-6 sm:p-8">{children}</motion.div>
    </div>
  );
}
