import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Actividad {
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

interface Dia {
  Manana: Actividad[];
  Tarde: Actividad[];
  Noche: Actividad[];
}

interface Itinerario {
  dias: Dia[];
}

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.scss']
})
export class FavoritosComponent implements OnInit {
  favoritosActividades: { lugar: string }[] = [];
  favoritosRestaurantes: { lugar: string }[] = [];
  favoritosItinerarios: Itinerario[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('userToken');
    if (usuario) {
      const userData = JSON.parse(usuario);
      this.http.post('http://localhost:8000/api/get-favoritos', { email: userData.email })
        .subscribe(
          (favoritos: any) => {
            this.favoritosActividades = favoritos.actividades;
            this.favoritosRestaurantes = favoritos.restaurantes;
            this.favoritosItinerarios = favoritos.itinerarios;
          },
          error => {
            console.error('Error cargando favoritos:', error);
          }
        );
    }
  }
}
