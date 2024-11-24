export default function ProductDetailsSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-200 rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-5 h-5 bg-gray-200 rounded-full" />
              ))}
            </div>
            <div className="h-5 bg-gray-200 rounded w-12" />
          </div>
          <div className="h-8 bg-gray-200 rounded w-24" />
          <div className="h-6 bg-gray-200 rounded w-48" />
        </div>
      </div>
    </div>
  );
}
