export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm animate-pulse">
      <div className="aspect-square relative bg-gray-200 rounded-t-lg" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 rounded w-20" />
          <div className="flex items-center gap-1">
            <div className="h-5 w-5 bg-gray-200 rounded-full" />
            <div className="h-4 bg-gray-200 rounded w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
