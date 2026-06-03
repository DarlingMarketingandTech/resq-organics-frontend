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

export interface ArticleCategory {
  slug: string;
  title: string;
  description: string;
}

export interface Article {
  slug: string;
  title: string;
  /** Slug of the parent ArticleCategory. */
  category: string;
  /** Short editorial pill shown on cards (e.g. "Ingredient Deep Dive"). */
  badge: string;
  excerpt: string;
  readTime: number;
  publishedAt: string;
  author: string;
  featured?: boolean;
  /** Markdown body (GFM). */
  body: string;
}
