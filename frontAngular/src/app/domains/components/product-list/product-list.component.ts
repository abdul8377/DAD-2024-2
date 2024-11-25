import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product';
import {ProductsService} from '../../../service/product.service';
import {CartService} from '../../../service/cart.service';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CurrencyPipe, CommonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    const cartItem = { ...product, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }
}
