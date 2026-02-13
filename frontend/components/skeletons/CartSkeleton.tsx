export default function CartSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-slate-700 rounded"></div>
          <div>
            <div className="h-6 bg-slate-700 rounded w-32 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-12 h-12 bg-slate-200 rounded-full mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-slate-200 rounded w-40 mx-auto mb-2 animate-pulse"></div>
          <div className="h-4 bg-slate-200 rounded w-48 mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
