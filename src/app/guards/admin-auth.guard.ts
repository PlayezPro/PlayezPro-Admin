import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token de admin')) { // Aquí deberías ajustar el nombre del token según tu aplicación
      return true; // Permitir acceso si el token está presente
    } else {
      this.router.navigate(['']); // Redirigir al usuario a la página de inicio de sesión si no hay token
      return false;
    }
  }
}