import { Component, inject } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.css'],
  standalone: true
})

export class AuthLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  userName: string = '';
  password: string = '';
  loginError: string = ''; // Mensaje de error
  isLoading: boolean = false; // Indicador de carga

  login(): void {
    const credentials = {
      userName: this.userName.trim(),
      password: this.password.trim(),
    };

    this.isLoading = true;
    this.authService.login(credentials.userName, credentials.password).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.authService.storeToken(response.token); // Guardar el token

        // Obtener el rol del token y redirigir según el rol
        const userRole = this.authService.getRole();
        console.log('Rol del usuario:', userRole); // Log para verificar el rol

        if (userRole === 'CLIENT') {
          this.router.navigate(['/client-dashboard/Product']); // Redirige a la lista de productos
        } else if (userRole === 'ADMIN') {
          this.router.navigate(['/admin-dashboard']); // Redirige al dashboard de admin
        } else {
          console.warn('Rol no reconocido. Redirigiendo al login.');
          this.router.navigate(['/login']); // Redirige al login en caso de rol no reconocido
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.loginError = 'Usuario o contraseña incorrectos.';
        console.error('Error al iniciar sesión:', err);
      },
    });
  }
}
