import {Component, OnInit} from '@angular/core';
import {Product} from '../../../../models/product';
import {ProductsService} from '../../../../service/product.service';
import {CartService} from '../../../../service/cart.service';
import {CommonModule, CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-client-products',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './client-products.component.html',
  styleUrl: './client-products.component.css'
})
export class ClientProductsComponent implements OnInit {
  products: Product[] = [];
  errorMessage: string = '';

  constructor(
    private productsService: ProductsService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        this.errorMessage = 'No se pudieron cargar los productos.';
      },
    });
  }

  addToCart(product: Product): void {
    const cartItem = { ...product, quantity: 1 };
    this.cartService.addToCart(cartItem);
  }
}
