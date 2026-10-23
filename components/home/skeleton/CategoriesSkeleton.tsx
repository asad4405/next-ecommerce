export function CategoriesSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 space-y-4">
            <div className="h-6 bg-slate-200 rounded-md w-40 animate-pulse"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-white border border-slate-200/80 p-4 rounded-2xl flex flex-col items-center space-y-3 animate-pulse">
                        <div className="w-16 h-16 bg-slate-200 rounded-full"></div>
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}