export default function OrderListSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header skeleton */}
      <div className="bg-slate-900 p-6">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-slate-700 rounded"></div>
          <div>
            <div className="h-6 bg-slate-700 rounded w-40 mb-2"></div>
            <div className="h-4 bg-slate-700 rounded w-24"></div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="p-6 space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-4 rounded-lg border border-slate-200 animate-pulse"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-200 rounded-lg"></div>
                <div>
                  <div className="h-5 bg-slate-200 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-slate-200 rounded w-24"></div>
                </div>
              </div>
              <div className="h-6 bg-slate-200 rounded w-16"></div>
            </div>

            <div className="flex gap-2 mb-3">
              <div className="h-6 bg-slate-200 rounded-md w-20"></div>
              <div className="h-6 bg-slate-200 rounded-md w-24"></div>
              <div className="h-6 bg-slate-200 rounded-md w-20"></div>
            </div>

            <div className="h-9 bg-slate-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
