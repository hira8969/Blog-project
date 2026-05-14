export default function StatCard({ label, value, tone = "from-aura to-coral" }) {
  return (
    <div className="glass rounded-[1.75rem] p-6">
      <p className="text-sm font-black uppercase text-slate-500">{label}</p>
      <p className={`mt-3 bg-gradient-to-r ${tone} bg-clip-text text-4xl font-black text-transparent`}>{value}</p>
    </div>
  );
}
