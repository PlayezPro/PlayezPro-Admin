import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  get email(){
    return this.formAdmin.get('email') as FormControl; 
}
get password(){
    return this.formAdmin.get('password') as FormControl; 
}

  formAdmin = new FormGroup({
    'email': new FormControl('', [Validators.required]),
    'password': new FormControl('', [Validators.required])
});
  //Alertas
  showAlert= false; 
  alertMessage: string = '';
  AlertMessage = false

  constructor(private router: Router, private userService: UsersService ) {}
  navigateToDash() {
    this.router.navigate(["/dashboard"])
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
              localStorage.setItem('token de admin',response.tokenLog)
              this.alertMessage = 'Bienvenido, Admin';
              this.AlertMessage = true;
              setTimeout(() => {
                  this.navigateToDash();
              }, 2000);
          },
          error => {
              console.error('Error al logear:', error);
              this.alertMessage = 'Error en email/contraseña';
              this.AlertMessage = true; // Mostrar la alerta
              this.showAlert = true;

              // Ocultar la alerta después de 3 segundos
              setTimeout(() => {
                  this.AlertMessage = false;
              }, 2000);
          }
      );
    } else {
        this.alertMessage = 'Por favor, complete todos los campos correctamente.';
        this.AlertMessage = true; // Mostrar la alerta
        this.showAlert = true;
        setTimeout(() => {
            this.AlertMessage = false;
        }, 2000);
    }
  }


}
