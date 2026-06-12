export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price: number | null;
  category_id: string;
  sizes: string[];
  colors: string[];
  images: string[];
  is_new_arrival: boolean;
  is_best_seller: boolean;
  is_on_sale: boolean;
  in_stock: boolean;
  created_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  description: string;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  created_at: string;
}

export interface Inquiry {
  id?: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  product_id?: string;
  created_at?: string;
}
