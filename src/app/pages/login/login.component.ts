import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/user.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class LoginComponent {
  formAdmin = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  showAlert = false; 
  alertMessage: string = '';

  constructor(
    private router: Router,
    private userService: UsersService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  navigateToDash() {
    this.router.navigate(["/users"]);
  }

  onSubmit() {
    if (this.formAdmin.valid) {
      const credentials = {
        email: this.formAdmin.value.email,
        password: this.formAdmin.value.password
      };

      this.userService.loginUser(credentials).subscribe(
        response => {
          console.log('Login con éxito:', response);

          // Verificar si estamos en un entorno de navegador
          if (isPlatformBrowser(this.platformId)) {
            // Utilizar localStorage
            localStorage.setItem('Token', response.token);
            const token = localStorage.getItem('Token');
            if (token) {
              const decodedToken: any = jwtDecode(token);
              localStorage.setItem('users_id', decodedToken.id);
              localStorage.setItem('role', decodedToken.roles);
            }
          }

          this.alertMessage = `Bienvenido, Administrador`;
          this.showAlert = true;
          setTimeout(() => {
            this.navigateToDash();
          }, 2000);
        },
        error => {
          console.error('Error al logear:', error);
          if (error.status === 401) {
            this.alertMessage = 'Credenciales Incorrectas';
          } else {
            this.alertMessage = 'Ha ocurrido un error. Por favor, intenta nuevamente más tarde.';
          }
          this.showAlert = true;
          setTimeout(() => {
            this.showAlert = false;
          }, 2000);
        }
      );
    } else {
      this.alertMessage = 'Por favor, complete todos los campos correctamente.';
      this.showAlert = true;
      setTimeout(() => {
        this.showAlert = false;
      }, 2000);
    }
  }
}
