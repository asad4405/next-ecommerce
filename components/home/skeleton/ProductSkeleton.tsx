export function ProductSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 bg-white border border-slate-200/80 rounded-2xl animate-pulse space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-1/4"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="space-y-3">
                        <div className="h-48 bg-slate-200 rounded-xl"></div>
                        <div className="h-4 bg-slate-200 rounded w-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}