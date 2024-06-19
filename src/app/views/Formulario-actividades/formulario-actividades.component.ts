import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Actividad{
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

@Component({
  selector: 'app-formulario-actividades',
  templateUrl: './formulario-actividades.component.html',
  styleUrls: ['./formulario-actividades.component.scss']
})
export class FormularioActividadesComponent {

  constructor(private http: HttpClient, private router: Router) {  }

  destinoActividades = "";
  personasActividades = "";
  ninosActividades = "";
  preferenciasActividades = "";
  evitarActividades = "";
  actividades: Actividad[] = [];
  loading = false;  // Variable para controlar el estado de carga

  enviarFormulario(): void {
    this.loading = true;  // Mostrar el spinner
    this.http.post<any>("http://localhost:8000/api/formularioactividades", {
      destino: this.destinoActividades,
      personas: this.personasActividades,
      ninos: this.ninosActividades,
      preferencias: this.preferenciasActividades,
      evitar: this.evitarActividades
    }).subscribe(response => {
      console.log(response);

      // Limpiar el texto eliminando los saltos de línea y las comillas escapadas
      let actividades = response.content
        .replace(/\n/g, "")
        .replace(/\\"/g, '"');

      console.log(actividades);

      // Parsear el JSON limpio
      this.actividades = JSON.parse(actividades);
      console.log(this.actividades);

      this.loading = false;  // Ocultar el spinner

      // ir a la ventana de actividades y enviarle los datos de thi.actividades
      this.router.navigate(['/actividades'], { state: { actividades: this.actividades } });
      
    }, error => {
      this.loading = false;  // Ocultar el spinner en caso de error
      console.error("Error en la solicitud", error);
    });
  }

  ngOnInit(): void {}
}
