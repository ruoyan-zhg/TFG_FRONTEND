import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Actividad {
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.scss'],
})
export class ActividadesComponent implements OnInit {
  actividades: Actividad[] = [];
  mostrarActividades: Actividad[] = [];
  indiceIncial: number = 0;
  indiceFinal: number = 3;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.actividades = history.state.actividades || []; // Añadir fallback para actividades
    this.updateDisplayedActivities();
  }

  updateDisplayedActivities() {
    this.mostrarActividades = this.actividades.slice(this.indiceIncial, this.indiceFinal);
  }

  siguientes3Actividades() {
    if (this.indiceFinal < this.actividades.length) {
      this.animateActivities('out', () => {
        this.indiceIncial = this.indiceFinal;
        this.indiceFinal = Math.min(this.indiceFinal + 3, this.actividades.length);
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
}
