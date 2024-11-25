import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../../service/product.service';
import {Product} from '../../../models/product';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CartService} from '../../../service/cart.service';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from '../../shared/ui/header/header.component';
@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [
     CommonModule, RouterOutlet, HeaderComponent
  ],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {


}
