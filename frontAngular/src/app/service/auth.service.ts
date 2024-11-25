import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';



@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private readonly baseUrl = 'http://localhost:8085/auth'; // URL del backend
  private readonly tokenKey = 'authToken'; // Clave para almacenar el token en localStorage

  constructor(private http: HttpClient) {}

  /**
   * Iniciar sesión
   * @param userName Nombre de usuario
   * @param password Contraseña
   * @returns Observable con el token JWT
   */
  login(userName: string, password: string): Observable<{ token: string }> {
    const payload = { userName, password };
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload);
  }

  /**
   * Registrar un usuario
   * @param userName Nombre de usuario
   * @param password Contraseña
   * @param role Rol del usuario
   * @returns Observable con la respuesta del backend
   */
  register(userName: string, password: string, role: string): Observable<any> {
    const payload = { userName, password, role };
    return this.http.post<any>(`${this.baseUrl}/create`, payload);
  }

  /**
   * Validar un token
   * @returns Observable con la respuesta del backend
   */
  validateToken(): Observable<{ valid: boolean }> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No hay un token para validar.'));
    }
    return this.http.post<{ valid: boolean }>(`${this.baseUrl}/validate`, { token });
  }

  /**
   * Almacenar el token en localStorage
   * @param token Token JWT
   */
  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  /**
   * Obtener el token del localStorage
   * @returns Token JWT o null si no existe
   */
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Decodificar el token JWT
   * @returns Objeto decodificado o null si el token no es válido
   */
  decodeToken(): any | null {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return null;
      }
    }
    return null;
  }

  /**
   * Obtener el rol del usuario desde el token
   * @returns Rol del usuario o null si no está disponible
   */
  getRole(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.role || null;
  }

  /**
   * Obtener el ID del usuario desde el token
   * @returns ID del usuario o null si no está disponible
   */
  getUserId(): string | null {
    const decodedToken = this.decodeToken();
    return decodedToken?.id || null;
  }

  /**
   * Verificar si el usuario está autenticado
   * @returns true si el token es válido y no ha caducado, de lo contrario false
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      const expiration = decodedToken?.exp;
      const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      return expiration && expiration > now;
    } catch (err) {
      console.error('Token inválido:', err);
      return false;
    }
  }

  /**
   * Verificar si el usuario tiene un rol específico
   * @param role Rol a verificar
   * @returns true si el usuario tiene el rol, de lo contrario false
   */
  hasRole(role: string): boolean {
    return this.getRole() === role;
  }

  /**
   * Eliminar el token del localStorage
   */
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
