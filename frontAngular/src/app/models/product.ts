

export interface Product {
  id: number;
  name: string;
  description: string;
  code: string;
  stock: number;
  price: number;
  category: {
    id: number;
    name: string;
  };
}
export interface ProductItemCart {
  product: Product;
  quantity: number;
}
