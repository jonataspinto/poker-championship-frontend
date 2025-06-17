export function RankingListSkeleton({ length = 7 }: { length?: number }) {
  return Array.from({ length }).map((_, index) => (
    <div key={index} className="flex gap-4 items-center animate-pulse">
      <div className="w-14 h-14 bg-gray-700 rounded-full" />
      <div className="flex flex-col gap-1">
        <div className="w-32 h-6 bg-gray-700 rounded" />
        <div className="w-20 h-4 bg-gray-600 rounded" />
      </div>
    </div>
  ));
}
