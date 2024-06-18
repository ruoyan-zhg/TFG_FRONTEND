import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
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

interface CoordenadaMapa {
  coords: [number, number];
  name: string;
}

@Component({
  selector: 'app-itinerario',
  templateUrl: './itinerario.component.html',
  styleUrls: ['./itinerario.component.scss']
})
export class ItinerarioComponent implements OnInit {
  
  itenerarioOriginal: Itinerario = { dias: [] };
  itinerario: Itinerario = { dias: [] };
  index = 0;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    //this.itinerario = history.state.itinerario || []; // Añadir fallback para actividades
    const respuesta = history.state.itinerario || [];
    this.itenerarioOriginal = respuesta.itinerario;
    console.log(this.itenerarioOriginal);
    // solo pasar a itinerario 1 dia para hacer como un carrusel
    this.itinerario.dias.push(this.itenerarioOriginal.dias[0]);
  }

  nextDay() {
    this.index = (this.index + 1) % this.itenerarioOriginal.dias.length;
    this.itinerario.dias = [];
    this.itinerario.dias.push(this.itenerarioOriginal.dias[this.index]);
  }

  prevDay() {
    this.index = (this.index - 1 + this.itenerarioOriginal.dias.length) % this.itenerarioOriginal.dias.length;
    this.itinerario.dias = [];
    this.itinerario.dias.push(this.itenerarioOriginal.dias[this.index]);
  }

  pasarinfo(itinerario: Itinerario) {
    const coordenadas = convertirItinerarioACoordenadasMapas(itinerario);
    this.router.navigate(['/mapa'], { state: { info: coordenadas } });
  }

  convertirActividadesAcoordenadasMapas(actividades: Actividad[]): CoordenadaMapa[] {
    return actividades.map(actividad => {
      const [lat, lon] = actividad.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
      return {
        coords: [lon, lat], // Asegúrate de que el orden sea [longitud, latitud]
        name: actividad.lugar
      };
    });
  }

  guardarFavorito(itinerario: Itinerario) {
    const usuarioString = localStorage.getItem('userToken');
    if (usuarioString) {
      const usuario = JSON.parse(usuarioString);
      this.http.post('http://localhost:8000/api/addFavoritoItinerario', { email: usuario.email, itinerario: this.itenerarioOriginal, tipo: 'itinerarios' })
        .subscribe(
          response => {
            alert('Itinerario guardado en favoritos');
          },
          error => {
            console.error('Error guardando favorito:', error);
          }
        );
    } else {
      alert('Debe iniciar sesión para guardar en favoritos');
    }
  
    console.log('Guardando favorito:', 'Itinerario Día ' + (this.index + 1));
  }
}

function convertirItinerarioACoordenadasMapas(itinerario: Itinerario): CoordenadaMapa[] {
  const coordenadasMapas: CoordenadaMapa[] = [];

  itinerario.dias.forEach(dia => {
    const actividades = [...dia.Manana, ...dia.Tarde, ...dia.Noche];
    actividades.forEach(actividad => {
      const [lat, lon] = actividad.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
      coordenadasMapas.push({
        coords: [lon, lat], // Asegúrate de que el orden sea [longitud, latitud]
        name: actividad.lugar
      });
    });
  });

  return coordenadasMapas;
}
