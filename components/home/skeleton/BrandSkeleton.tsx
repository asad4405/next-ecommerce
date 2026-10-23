export function BrandSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-32 animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="h-20 bg-slate-200 rounded-xl animate-pulse"></div>
                ))}
            </div>
        </div>
    );
}