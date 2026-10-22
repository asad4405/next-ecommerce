import Link from "next/link";
import { Search, ShoppingBag, User, PhoneCall, Menu, X } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types/category";
import { Settings } from "@/types/Settings";
import { Contact } from "@/types/Contact";



interface CategoryResponse {
    status: boolean;
    data: Category[];
    message: string;
}

export async function Header() {
    // Setting API
    const settingRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/settings`,
        { cache: "no-store" }
    );
    const settingsData = await settingRes.json();
    const settings: Settings = settingsData.data;

    // Contact API
    const contactRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/contact-info`,
        { cache: "no-store" }
    );
    const contactData = await contactRes.json();
    const contact: Contact = contactData.data;

    // Categories API
    const categoriesRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories`,
        { cache: "no-store" }
    );
    const categoriesData: CategoryResponse = await categoriesRes.json();
    const categories: Category[] = categoriesData.data;

    // Image base URL
    const imageUrl = process.env.NEXT_API_IMAGE_URL;

    return (
        <header className="bg-white sticky top-0 z-50 border-b border-slate-200">

            {/* 1. Top Bar */}
            <div className="bg-[#124170] text-slate-200 text-xs py-2 px-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <p className="font-medium text-amber-300">
                        {settings.description}
                    </p>

                    <div className="hidden md:flex items-center space-x-6">
                        <span className="flex items-center gap-1.5 text-white font-semibold">
                            <PhoneCall size={13} className="text-amber-300" />
                            Hotline: {contact.phone}
                        </span>

                        <Link href="#" className="hover:text-amber-300 transition">
                            Track Order
                        </Link>
                    </div>
                </div>
            </div>

            {/* 2. Main Header */}
            <div className="max-w-7xl mx-auto px-4 py-3.5 flex items-center justify-between gap-4">

                {/* Mobile Menu & Logo */}
                <div className="relative flex items-center gap-3 lg:static">

                    <input
                        type="checkbox"
                        id="mobile-menu-checkbox"
                        className="peer hidden"
                    />

                    <label
                        htmlFor="mobile-menu-checkbox"
                        className="lg:hidden text-slate-700 p-1 cursor-pointer hover:bg-slate-100 rounded transition select-none"
                        aria-label="Toggle Menu"
                    >
                        <Menu size={26} className="block peer-checked:hidden" />
                        <X size={26} className="hidden peer-checked:block" />
                    </label>

                    {/* Brand Logo */}
                    <Link href="/" className="flex items-center">
                        <div className="relative h-10 w-auto flex items-center">
                            <Image
                                src={`${imageUrl}/${settings.dark_logo}`}
                                alt="STORE Logo"
                                width={160}
                                height={45}
                                className="h-10 w-auto object-contain"
                                unoptimized={true}
                                priority
                            />
                        </div>
                    </Link>

                    {/* Mobile Drawer Menu */}
                    <div className="hidden peer-checked:block absolute top-14 left-0 w-72 bg-white border border-slate-200 shadow-xl p-4 rounded-lg z-50 lg:hidden">
                        <nav className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
                            <Link
                                href="/"
                                className="py-2.5 border-b border-slate-100 hover:text-[#124170] transition"
                            >
                                Home
                            </Link>

                            {categories.map((category: Category) => (
                                <Link
                                    key={category.id}
                                    href={`/categories/${category.slug}`}
                                    className="py-2.5 border-b border-slate-100 hover:text-[#124170] transition"
                                >
                                    {category.category_name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex flex-1 max-w-xl mx-4">
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-slate-100 border border-slate-300 rounded-md py-2.5 pl-4 pr-12 text-sm focus:outline-none focus:border-[#124170] text-slate-800"
                        />

                        <button className="absolute right-0 top-0 h-full px-4 bg-[#124170] hover:bg-[#0d2d4d] text-white rounded-r-md transition flex items-center justify-center">
                            <Search size={18} />
                        </button>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-3 sm:space-x-5">
                    <Link
                        href="#"
                        className="hidden lg:flex items-center gap-2 p-1 text-slate-700 hover:text-[#124170] transition"
                    >
                        <div className="bg-slate-100 p-2 rounded-full">
                            <User size={18} />
                        </div>

                        <div className="text-left text-xs">
                            <p className="text-slate-400">Account</p>
                            <p className="font-bold text-slate-800">
                                Register / Login
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/cart"
                        className="flex items-center gap-2 bg-[#124170]/10 hover:bg-[#124170]/20 text-[#124170] px-3.5 py-2.5 rounded-md font-bold text-sm transition"
                    >
                        <ShoppingBag size={20} />
                        <span className="hidden sm:inline">Cart (0)</span>
                    </Link>
                </div>
            </div>

            {/* Mobile Search Input */}
            <div className="px-4 pb-3 md:hidden">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full bg-slate-100 border border-slate-300 rounded-md py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-[#124170]"
                    />

                    <button className="absolute right-2.5 top-2.5 text-slate-400">
                        <Search size={18} />
                    </button>
                </div>
            </div>

            {/* 3. Category Nav Bar */}
            <div className="hidden lg:block bg-[#124170] text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center space-x-8 text-sm font-semibold py-2.5">
                        <Link href="/" className="hover:text-amber-300 transition">
                            Home
                        </Link>

                        {categories.map((category: Category) => (
                            <Link
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="hover:text-amber-300 transition"
                            >
                                {category.category_name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

        </header>
    );
}