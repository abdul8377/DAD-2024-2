import {Component, OnInit} from '@angular/core';
import {CartItem} from '../../../../models/cart-item';
import {CartService} from '../../../../service/cart.service';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe , FormsModule, CommonModule
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(protected cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateItemQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.cartService.removeFromCart(productId);
    } else {
      this.cartService.updateCartItem(productId, quantity);
    }
  }
}
