export default function Particles() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <span className="absolute left-[8%] top-[16%] h-24 w-24 animate-blob rounded-full bg-mint/30 blur-3xl" />
      <span className="absolute right-[10%] top-[8%] h-32 w-32 animate-blob rounded-full bg-coral/30 blur-3xl [animation-delay:2s]" />
      <span className="absolute bottom-[18%] left-[35%] h-28 w-28 animate-blob rounded-full bg-aura/30 blur-3xl [animation-delay:4s]" />
    </div>
  );
}
