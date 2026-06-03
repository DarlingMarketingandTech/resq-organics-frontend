export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  price: string;
  regular_price: string;
  sale_price: string;
  average_rating: string;
  rating_count: number;
  stock_status: "instock" | "outofstock" | "onbackorder";
  categories: Category[];
  images: ProductImage[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
}

export interface CartItem {
  productId: number;
  quantity: number;
  name: string;
  slug: string;
  image: string;
  unitPrice: number;
  lineTotal: number;
}
