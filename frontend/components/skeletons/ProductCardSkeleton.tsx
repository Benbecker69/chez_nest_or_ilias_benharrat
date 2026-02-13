export default function ProductCardSkeleton() {
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white ring-1 ring-slate-200 animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-slate-200"></div>

      {/* Content skeleton */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
          <div className="h-6 bg-slate-200 rounded w-16"></div>
        </div>

        {/* Ingredients skeleton */}
        <div className="flex gap-1.5 mt-3">
          <div className="h-6 bg-slate-200 rounded-md w-20"></div>
          <div className="h-6 bg-slate-200 rounded-md w-24"></div>
          <div className="h-6 bg-slate-200 rounded-md w-16"></div>
        </div>
      </div>
    </div>
  );
}
