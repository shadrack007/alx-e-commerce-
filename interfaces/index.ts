export interface Category {
  id: number;
  name: string;
  image: string;
  slug: string;
}

export interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
