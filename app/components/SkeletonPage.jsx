export default function SkeletonPage() {
    return (
        <div className="p-4 animate-pulse space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>

            <div className="h-48 bg-gray-300 rounded"></div>

            <div className="flex space-x-4">
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="h-48 bg-gray-300 rounded"></div>
        </div>
    );
}
  