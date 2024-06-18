import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  contrasena: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  showModal: boolean = false;
  modalMessage: string = '';

  constructor(private http: HttpClient) {}

  enviarFormularioRegistro(): void {
    this.http.post<any>('http://localhost:8000/api/register', {
      nombre: this.nombre,
      email: this.email,
      contrasena: this.contrasena
    }).subscribe(
      response => {
        console.log(response);
        this.showMessage('Registrado correctamente');
      },
      error => {
        console.error(error);
        if (error.status === 409) {
          this.showMessage('El correo electrónico ya está registrado.');
        } else {
          this.showMessage('Algo ha ido mal');
        }
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
