"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Filter, RotateCcw } from "lucide-react";
import { CategoryType, SubcategoryType, ChildCategoryType } from "@/types/Category";

export interface CategoryTree extends CategoryType {
    subcategories?: (SubcategoryType & {
        childcategories?: ChildCategoryType[];
    })[];
}

interface FilterSidebarProps {
    categories: CategoryTree[];
    activeCategorySlug?: string;
    activeSubcategorySlug?: string;
    activeChildcategorySlug?: string;
}

export function FilterSidebar({
    categories,
    activeCategorySlug,
    activeSubcategorySlug,
    activeChildcategorySlug,
}: FilterSidebarProps) {
    const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});
    const [openSubcategories, setOpenSubcategories] = useState<Record<number, boolean>>({});

    const toggleCategory = (id: number) => {
        setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const toggleSubcategory = (id: number) => {
        setOpenSubcategories((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <aside className="w-full space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                        <Filter size={18} className="text-[#124170]" />
                        <span>Filter Products</span>
                    </div>
                    <Link
                        href="/shop"
                        className="text-xs font-semibold text-slate-400 hover:text-rose-500 transition flex items-center gap-1"
                    >
                        <RotateCcw size={12} /> Reset
                    </Link>
                </div>

                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                        Categories
                    </h4>

                    <div className="space-y-1 text-sm font-medium">
                        <Link
                            href="/shop"
                            className={`flex items-center justify-between py-2 px-3 rounded-xl transition ${
                                !activeCategorySlug && !activeSubcategorySlug && !activeChildcategorySlug
                                    ? "bg-[#124170] text-white font-bold"
                                    : "text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            <span>All Products</span>
                        </Link>

                        {categories.map((cat) => {
                            const isCatActive = activeCategorySlug === cat.slug;
                            const isCatOpen = openCategories[cat.id] || isCatActive;

                            return (
                                <div key={cat.id} className="space-y-1">
                                    <div className="flex items-center justify-between group">
                                        <Link
                                            href={`/category/${cat.slug}`}
                                            className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold transition ${
                                                isCatActive
                                                    ? "text-[#124170] bg-[#124170]/10"
                                                    : "text-slate-700 hover:text-[#124170]"
                                            }`}
                                        >
                                            {cat.category_name}
                                        </Link>

                                        {cat.subcategories && cat.subcategories.length > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => toggleCategory(cat.id)}
                                                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
                                            >
                                                {isCatOpen ? (
                                                    <ChevronDown size={14} />
                                                ) : (
                                                    <ChevronRight size={14} />
                                                )}
                                            </button>
                                        )}
                                    </div>

                                    {isCatOpen && cat.subcategories && (
                                        <div className="ml-3 pl-2 border-l border-slate-200 space-y-1 my-1">
                                            {cat.subcategories.map((sub) => {
                                                const isSubActive = activeSubcategorySlug === sub.slug;
                                                const isSubOpen = openSubcategories[sub.id] || isSubActive;

                                                return (
                                                    <div key={sub.id} className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <Link
                                                                href={`/subcategory/${sub.slug}`}
                                                                className={`flex-1 py-1 px-2.5 rounded-lg text-xs font-semibold transition ${
                                                                    isSubActive
                                                                        ? "text-[#124170] font-bold bg-[#124170]/10"
                                                                        : "text-slate-600 hover:text-[#124170]"
                                                                }`}
                                                            >
                                                                {sub.subcategory_name}
                                                            </Link>

                                                            {sub.childcategories && sub.childcategories.length > 0 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleSubcategory(sub.id)}
                                                                    className="p-1 text-slate-400 hover:text-slate-700"
                                                                >
                                                                    {isSubOpen ? (
                                                                        <ChevronDown size={12} />
                                                                    ) : (
                                                                        <ChevronRight size={12} />
                                                                    )}
                                                                </button>
                                                            )}
                                                        </div>

                                                        {isSubOpen && sub.childcategories && (
                                                            <div className="ml-3 pl-2 border-l border-slate-200 space-y-1 my-1">
                                                                {sub.childcategories.map((child) => {
                                                                    const isChildActive = activeChildcategorySlug === child.slug;

                                                                    return (
                                                                        <Link
                                                                            key={child.id}
                                                                            href={`/childcategory/${child.slug}`}
                                                                            className={`block py-1 px-2 rounded-lg text-[11px] transition ${
                                                                                isChildActive
                                                                                    ? "text-[#124170] font-bold bg-[#124170]/10"
                                                                                    : "text-slate-500 hover:text-[#124170]"
                                                                            }`}
                                                                        >
                                                                            {child.childcategory_name}
                                                                        </Link>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}