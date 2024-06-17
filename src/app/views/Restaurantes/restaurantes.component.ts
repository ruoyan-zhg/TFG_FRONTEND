import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

interface Restaurante{
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

interface CoordenadaMapa {
  coords: [number, number];
  name: string;
}

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.scss']
})
export class RestaurantesComponent implements OnInit {
  restaurantes:Restaurante[] = [];
  mostrarRestaurantes: Restaurante[] = [];
  indiceIncial: number = 0;
  indiceFinal: number = 3;

  constructor(private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {
    this.restaurantes = history.state.restaurantes || []; // Añadir fallback para actividades
    this.updateDisplayedActivities();
  }

  updateDisplayedActivities() {
    this.mostrarRestaurantes = this.restaurantes.slice(this.indiceIncial, this.indiceFinal);
  }

  siguientes3Actividades() {
    if (this.indiceFinal < this.restaurantes.length) {
      this.animateActivities('out', () => {
        this.indiceIncial = this.indiceFinal;
        this.indiceFinal = Math.min(this.indiceFinal + 3, this.restaurantes.length);
        this.updateDisplayedActivities();
        this.animateActivities('in');
      });
    }
  }

  anteriores3Actividades() {
    if (this.indiceIncial > 0) {
      this.animateActivities('out', () => {
        this.indiceFinal = this.indiceIncial;
        this.indiceIncial = Math.max(this.indiceIncial - 3, 0);
        this.updateDisplayedActivities();
        this.animateActivities('in');
      });
    }
  }

  animateActivities(direction: 'in' | 'out', callback?: () => void) {
    const container = document.querySelector('.u-repeater');
    container!.classList.remove('fade-in', 'fade-out');

    if (direction === 'out') {
      container!.classList.add('fade-out');
    } else {
      container!.classList.add('fade-in');
    }

    setTimeout(() => {
      if (callback) callback();
    }, 500); // Match the duration of the CSS transition
  }

  pasarinfo(restaurantes: Restaurante[]){
    const coordenadas = this.convertirActividadesAcoordenadasMapas(restaurantes);
    
    this.router.navigate(['/mapa'], { state: { info: coordenadas } });

  }


  convertirActividadesAcoordenadasMapas(restaurantes: Restaurante[]): CoordenadaMapa[] {
    return restaurantes.map(restaurantes => {
      const [lat, lon] = restaurantes.coordenadas.split(',').map(coord => parseFloat(coord.trim()));
      return {
        coords: [lon, lat], // Asegúrate de que el orden sea [longitud, latitud]
        name: restaurantes.lugar
      };
    });
  }

}
