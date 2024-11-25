import { Product } from './product';

export interface CartItem extends Product {
  quantity: number; // Cantidad de producto en el carrito
}
