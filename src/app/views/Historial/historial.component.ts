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
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {
  historialActividades: { lugar: string }[] = [];
  historialRestaurantes: { lugar: string }[] = [];
  historialItinerarios: Itinerario[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const usuario = localStorage.getItem('userToken');
    if (usuario) {
      const userData = JSON.parse(usuario);
      this.http.post('http://localhost:8000/api/get-historial', { email: userData.email })
        .subscribe(
          (historial: any) => {
            this.historialActividades = historial.actividades;
            this.historialRestaurantes = historial.restaurantes;
            this.historialItinerarios = historial.itinerarios;
          },
          error => {
            console.error('Error cargando historial:', error);
          }
        );
    }
  }

}


