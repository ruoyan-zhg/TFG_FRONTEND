import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  contrasena: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showModal: boolean = false;
  modalMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  enviarFormularioLogin(): void {
    this.http.post<any>('http://localhost:8000/api/login', {
      email: this.email,
      contrasena: this.contrasena
    }).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('userToken', response.token); // Almacena el token de usuario en localStorage
        this.showMessage('Se ha iniciado sesión correctamente');
        // Navegar a otra página si es necesario
        // this.router.navigate(['/ruta-deseada']);
      },
      error => {
        console.error(error);
        this.showMessage('Error en el inicio de sesión');
      }
    );
  }

  showMessage(message: string): void {
    this.modalMessage = message;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
