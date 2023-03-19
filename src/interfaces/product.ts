export interface Product {
  brand: string;
  category: string;
  description: string;
  discountPerentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

export interface ProductList_Data {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
}
