export interface CategoryType {
    id: number;
    category_name: string;
    slug: string;
    image: string;
    status: number;
}

export interface SubcategoryType {
    id: number; 
    category_id: number; 
    subcategory_name: string;
    slug: string; 
    image: string; 
    meta_title: string; 
    meta_description: string;
    status: number;
}
export interface ChildCategoryType {
    id: number; 
    subcategory_id: number; 
    childcategory_name: string; 
    slug: string; 
    image: string; 
    meta_title: string;
    meta_description: string;
    status: number;
}