import ProductCardSkeleton from './ProductCardSkeleton';

interface SectionSkeletonProps {
  itemCount?: number;
}

export default function SectionSkeleton({ itemCount = 4 }: SectionSkeletonProps) {
  return (
    <section className="mb-12">
      {/* Header skeleton */}
      <div className="flex items-center gap-3 mb-6 animate-pulse">
        <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
        <div className="h-8 bg-slate-200 rounded w-48"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: itemCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
