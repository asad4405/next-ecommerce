export interface ProductSliderImage {
  id: number;
  slider_image: string;
  product_id: number;
}

export interface Product {
  id: number;
  product_name: string;
  product_code: string;
  slug: string; 
  product_image: string;
  product_type: number;
  category_id: number;
  old_price: number;
  new_price: number;
  stock: number;
  short_description: string;
  description: string;
  sliderimages: ProductSliderImage[];
}