import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {}

  // Obtener todos los elementos del carrito
  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  // Agregar un producto al carrito
  addToCart(product: CartItem): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.cartItems.push(product);
    }

    this.updateCartState();
  }

  // Eliminar un producto del carrito
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCartState();
  }

  // Vaciar el carrito
  clearCart(): void {
    this.cartItems = [];
    this.updateCartState();
  }

  updateCartItem(productId: number, quantity: number): void {
    const item = this.cartItems.find((item) => item.id === productId);
    if (item) {
      item.quantity = quantity;
      this.updateCartState();
    }
  }

  // Actualizar el estado del carrito
  private updateCartState(): void {
    this.cartItemsSubject.next([...this.cartItems]);
  }
}
