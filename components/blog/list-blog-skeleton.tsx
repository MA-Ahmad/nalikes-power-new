const ListBlogPostSkeleton: React.FC = () => {
  return (
    <div className="rounded-2xl bg-neutral-950 border border-neutral-800 shadow-md overflow-hidden flex flex-col p-5 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="size-10 bg-gray-700 rounded-full"></div>
        <div>
          <div className="h-4 w-20 bg-gray-700 rounded mb-1"></div>
          <div className="h-3 w-24 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="flex items-center flex-col sm:flex-row gap-10 mt-4 sm:mt-1">
        <div className="w-full sm:w-2/3">
          <div className="h-6 bg-gray-700 rounded mb-2"></div>
          <div className="h-4 bg-gray-700 rounded mb-1"></div>
          <div className="h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-full sm:w-1/3">
          <div className="h-[150px] bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
}

export default ListBlogPostSkeleton
