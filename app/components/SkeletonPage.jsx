export default function SkeletonPage() {
    return (
        <div className="w-full h-screen overflow-hidden bg-white p-6 animate-pulse space-y-6">
            {/* Page Title Skeleton */}
            <div className="h-8 bg-gray-300 rounded w-1/2 md:w-1/3"></div>

            {/* Paragraph Lines */}
            <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6 md:w-2/3"></div>
            </div>

            {/* Large section like image/banner */}
            <div className="h-60 md:h-72 bg-gray-300 rounded"></div>

            {/* Button Group Skeleton */}
            <div className="flex flex-col sm:hidden d-block sm:flex-row gap-4">
                <div className="h-10 w-full sm:w-32 bg-gray-300 rounded"></div>
                <div className="h-10 w-full sm:w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Cards Skeleton (for products, etc.) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 hidden sm:grid">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-64 bg-gray-200 rounded-lg shadow-sm p-4 flex flex-col space-y-4"
                    >
                        <div className="h-40 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
                    </div>
                ))}
            </div>

            {/* Footer / Bottom Section */}
            <div className="h-48 bg-gray-300 rounded"></div>
        </div>
    );
}
  