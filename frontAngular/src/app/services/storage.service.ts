import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly TOKEN_KEY = 'accessToken';
  private readonly USERNAME_KEY = 'username';
  private readonly USER_ROLE_KEY = 'userRole';

  constructor() {}

  // Guardar el token de acceso
  storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Eliminar el token
  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Guardar el nombre de usuario
  storeUsername(username: string): void {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  // Obtener el nombre de usuario
  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  // Eliminar el nombre de usuario
  clearUsername(): void {
    localStorage.removeItem(this.USERNAME_KEY);
  }

  // Guardar el rol del usuario
  storeUserRole(role: string): void {
    localStorage.setItem(this.USER_ROLE_KEY, role);
  }

  // Obtener el rol del usuario
  getUserRole(): string | null {
    return localStorage.getItem(this.USER_ROLE_KEY);
  }

  // Eliminar el rol del usuario
  clearUserRole(): void {
    localStorage.removeItem(this.USER_ROLE_KEY);
  }

  // Verificar si el token es válido (opcional)
  isTokenValid(): boolean {
    const token = this.getToken();
    return !!token; // Devuelve true si el token existe
  }

  // Limpiar todos los datos relacionados con el usuario
  clearAll(): void {
    this.clearToken();
    this.clearUsername();
    this.clearUserRole();
  }

  // Obtener detalles completos del usuario (opcional)
  getUserDetails(): {
    username: string | null;
    role: string | null;
  } {
    return {
      username: this.getUsername(),
      role: this.getUserRole(),
    };
  }
}
