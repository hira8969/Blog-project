export default function SkeletonCard() {
  return (
    <div className="glass rounded-[1.75rem] p-4">
      <div className="skeleton h-52 rounded-[1.3rem]" />
      <div className="mt-5 space-y-3">
        <div className="skeleton h-5 w-3/4 rounded-full" />
        <div className="skeleton h-4 rounded-full" />
        <div className="skeleton h-4 w-5/6 rounded-full" />
      </div>
    </div>
  );
}
