import Link from "next/link";
import { Home, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
            <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">

                <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl mx-auto flex items-center justify-center shadow-inner">
                    <AlertCircle size={32} />
                </div>

                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Page Not Found
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
                        Oops! The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <Button
                        variant="outline"
                        className="w-full sm:w-auto rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold"
                    >
                        <Link href="/" className="flex items-center justify-center gap-2">
                            <ArrowLeft size={16} />
                            Go Back
                        </Link>
                    </Button>

                    <Button
                        className="w-full sm:w-auto rounded-xl bg-[#124170] hover:bg-[#0d3156] text-white font-bold shadow-sm"
                    >
                        <Link href="/" className="flex items-center justify-center gap-2">
                            <Home size={16} />
                            Back To Home
                        </Link>
                    </Button>
                </div>

            </div>
        </main>
    );
}