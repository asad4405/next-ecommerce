export default function SubcategoryLoading() {
    return (
        <main className="max-w-7xl mx-auto px-4 py-8 space-y-6 animate-pulse">
            
            <div className="bg-slate-50 border border-slate-200/85 rounded-2xl p-6 space-y-3">
                <div className="h-8 bg-slate-200 rounded-lg w-1/3"></div>
                <div className="h-4 bg-slate-200 rounded-md w-1/4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4">
                        <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                        <div className="space-y-3 pt-2">
                            <div className="h-10 bg-slate-100 rounded-lg"></div>
                            <div className="h-10 bg-slate-100 rounded-lg"></div>
                            <div className="h-10 bg-slate-100 rounded-lg"></div>
                            <div className="h-10 bg-slate-100 rounded-lg"></div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-3 space-y-4">
                    
                    <div className="bg-white border border-slate-200/80 rounded-2xl px-5 py-4 shadow-sm">
                        <div className="h-5 bg-slate-200 rounded-md w-1/4"></div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <div key={item} className="bg-white border border-slate-200/85 rounded-2xl p-4 space-y-4 shadow-sm">
                                
                                <div className="w-full h-52 bg-slate-200 rounded-xl"></div>
                                
                                
                                <div className="space-y-2.5">
                                    <div className="h-4 bg-slate-200 rounded-md w-full"></div>
                                    <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
                                    <div className="h-5 bg-slate-200 rounded-md w-1/2 pt-1"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}