export const WhiteboardSkeleton = () => (
  <div className="flex flex-col gap-6 animate-pulse mb-10">
    <div className="flex flex-wrap items-center justify-between gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-12 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-8 h-8 bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 w-8 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="size-9 bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-3 w-16 bg-zinc-800 rounded" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-10 h-10 bg-zinc-800 rounded-lg" />
          ))}
        </div>
      </div>
    </div>

    <div className="flex flex-col sm:flex-row gap-6">
      <div className="flex-1">
        <div className="w-full h-[502px] bg-white/5" />
      </div>
      <div className="sm:w-[220px] h-[504px] border border-zinc-800 p-4">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800">
          <div className="h-3 w-16 bg-zinc-800 rounded" />
          <div className="h-3 w-8 bg-zinc-800/50 rounded" />
        </div>
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 w-full bg-zinc-800/30 rounded" />
          ))}
        </div>
      </div>
    </div>
  </div>
);
