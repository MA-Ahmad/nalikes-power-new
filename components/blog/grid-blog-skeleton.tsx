const GridBlogPostSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-neutral-950 border border-neutral-800 overflow-hidden flex flex-col animate-pulse">
      <div className="h-[200px] bg-gray-700"></div>
      <div className="p-5">
        <div className="h-6 bg-gray-700 rounded mb-2"></div>
        <div className="flex items-center gap-2 mt-10">
          <div className="h-4 w-20 bg-gray-700 rounded"></div>
          <div className="h-4 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default GridBlogPostSkeleton