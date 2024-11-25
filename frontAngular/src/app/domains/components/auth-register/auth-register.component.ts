import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-auth-register',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-register.component.html',
  styleUrls: ['./auth-register.component.css'],
  standalone: true,
})
export class AuthRegisterComponent {
  registerForm: FormGroup;
  isLoading = false; // Indicador de carga

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService, // Uso del servicio de almacenamiento
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        userName: ['', [Validators.required, Validators.minLength(3)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/), // Al menos 1 mayúscula, 1 minúscula y 1 número
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        terms: [false, [Validators.requiredTrue]],
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Validador personalizado para verificar si las contraseñas coinciden
  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatch: true };
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { userName, password } = this.registerForm.value;
      const role = 'CLIENT'; // Asignar automáticamente el rol CLIENT
      this.isLoading = true;

      // Realiza el registro
      this.authService.register(userName, password, role).subscribe({
        next: (response: any) => {
          const userId = response?.id;
          console.log('Usuario registrado con ID:', userId);

          // Realiza el login automáticamente
          this.authService.login(userName, password).subscribe({
            next: (loginResponse: any) => {
              const token = loginResponse?.token;
              if (token) {
                // Almacena datos en StorageService
                this.storageService.storeToken(token);
                this.storageService.storeUsername(userName);
                this.storageService.storeUserRole(role);


                // Redirige al dashboard del cliente
                this.router.navigate(['/client-dashboard']);
              }
            },
            error: (err) => {
              console.error('Error en el login automático:', err);
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        },
        error: (err) => {
          console.error('Error al registrar:', err);
          this.isLoading = false;
        },
      });
    } else {
      console.warn('Formulario inválido');
    }
  }
}
