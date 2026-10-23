export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 h-64 sm:h-80 lg:h-96 bg-slate-200 rounded-2xl animate-pulse" />

                <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4 h-64 sm:h-80 lg:h-96">
                    <div className="bg-slate-200 rounded-2xl animate-pulse h-full" />
                    <div className="bg-slate-200 rounded-2xl animate-pulse h-full" />
                </div>
            </div>

            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <div className="w-48 h-6 bg-slate-200 rounded animate-pulse" />
                    <div className="w-24 h-4 bg-slate-200 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex flex-col justify-between h-72 sm:h-80 animate-pulse"
                        >
                            <div className="w-full h-36 sm:h-44 bg-slate-200 rounded-xl mb-3" />
                            
                            <div className="space-y-2 flex-1">
                                <div className="w-16 h-3 bg-slate-200 rounded" />
                                <div className="w-full h-4 bg-slate-200 rounded" />
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                                <div className="w-20 h-5 bg-slate-200 rounded" />
                                <div className="w-8 h-8 bg-slate-200 rounded-lg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}