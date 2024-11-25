import { Routes } from '@angular/router';
import {AuthLoginComponent} from './domains/components/auth-login/auth-login.component';
import {AdminDashboardComponent} from './domains/components/admin-dashboard/admin-dashboard.component';
import {ClientDashboardComponent} from './domains/components/client-dashboard/client-dashboard.component';
import {ProductListComponent} from './domains/components/product-list/product-list.component';
import {CartComponent} from './domains/components/client-dashboard/cart/cart.component';
import {authGuard} from './service/auth.guard';


export const routes: Routes = [
  {
    path: 'Products',
    loadComponent: () =>
      import('./domains/components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
    canActivate: [authGuard],
    data: { role: 'CLIENT' }, // Solo CLIENT puede acceder
  },

  {
    path: 'client-dashboard',
    loadComponent: () =>
      import('./domains/components/client-dashboard/client-dashboard.component').then(
        (m) => m.ClientDashboardComponent
      ),
    canActivate: [authGuard],
    data: { role: 'CLIENT' },
  },
  {
    path: 'admin-dashboard',
    loadComponent: () =>
      import('./domains/components/admin-dashboard/admin-dashboard.component').then(
        (m) => m.AdminDashboardComponent
      ),
    canActivate: [authGuard],
    data: { role: 'ADMIN' },
  },
  {
    path: 'auth-login',
    loadComponent: () =>
      import('./domains/components/auth-login/auth-login.component').then(
        (m) => m.AuthLoginComponent
      ),
  },

  {
    path: '**',
    redirectTo: '/auth-login',
  },

  {
    path: 'client-dashboard',
    children: [
      { path: 'Products', component: ProductListComponent,  canActivate: [authGuard], },
      { path: 'cart', component: CartComponent },
    ],
  },


];
