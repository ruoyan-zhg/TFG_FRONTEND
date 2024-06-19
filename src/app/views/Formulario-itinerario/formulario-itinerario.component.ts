import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

interface Itinerario {
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

@Component({
  selector: 'app-formulario-itinerario',
  templateUrl: './formulario-itinerario.component.html',
  styleUrls: ['./formulario-itinerario.component.scss']
})
export class FormularioItinerarioComponent {

  constructor(private http: HttpClient, private router: Router) { }

  destinoItinerario = "";
  personasItinerario = "";
  ninosItinerario = "";
  numDiasItinerario = "";
  preferenciasItinerario = "";
  evitarItinerario = "";

  itinerarios: Itinerario[] = [];
  loading = false;  // Variable para controlar el estado de carga

  enviarFormulario(): void {
    this.loading = true;  // Mostrar el spinner
    console.log("comienzo");
    this.http.post<any>("http://localhost:8000/api/formularioitinerario", {
      destino: this.destinoItinerario,
      personas: this.personasItinerario,
      ninos: this.ninosItinerario,
      dias: this.numDiasItinerario,
      preferencias: this.preferenciasItinerario,
      evitar: this.evitarItinerario
    }).pipe(
      finalize(() => {
        console.log("fin");
        this.router.navigate(['/itinerario'], { state: { itinerario: this.itinerarios } });
      })
    ).subscribe(response => {
      console.log(response);

      // Limpiar el texto eliminando los saltos de línea y las comillas escapadas
      let itinerarios = response.content
        .replace(/\n/g, "")
        .replace(/\\"/g, '"');

      console.log(itinerarios);

      // Parsear el JSON limpio
      this.itinerarios = JSON.parse(itinerarios);
      console.log(this.itinerarios);

      this.loading = false;  // Ocultar el spinner
    });
  }

  ngOnInit(): void {

  }
}
