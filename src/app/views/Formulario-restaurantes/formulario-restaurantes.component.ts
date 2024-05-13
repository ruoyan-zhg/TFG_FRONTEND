import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Restaurante{
  lugar: string;
  descripcion: string;
  coordenadas: string;
}

@Component({
  selector: 'app-formulario-restaurantes',
  templateUrl: './formulario-restaurantes.component.html',
  styleUrls: ['./formulario-restaurantes.component.scss']
})
export class FormularioRestaurantesComponent {

  constructor(private http: HttpClient, private router: Router ) { }

  cuidadRestaurantes="";
  zonaRestaurantes="";
  ocasionRestaurantes="";
  ninosRestaurantes="";
  preferenciasRestaurantes="";
  evitarRestaurantes="";
  restaurantes:Restaurante[] = [];

  enviarFormularioRestaurantes(): void {
    this.http.post<any>("http://localhost:8000/api/formulariorestaurantes", {
      ciudad: this.cuidadRestaurantes,
      zona: this.zonaRestaurantes,
      ocasion: this.ocasionRestaurantes,
      ninos: this.ninosRestaurantes,
      preferencias: this.preferenciasRestaurantes,
      evitar: this.evitarRestaurantes
    }).subscribe(response => {
      console.log(response);

      // Limpiar el texto eliminando los saltos de línea y las comillas escapadas
      let restaurantes = response.content
        .replace(/\n/g, "")
        .replace(/\\"/g, '"');

      console.log(restaurantes);

      // Parsear el JSON limpio
      this.restaurantes = JSON.parse(restaurantes);
      console.log(this.restaurantes);

      // ir a la ventana de actividades y envialrle los datos de thi.actividades
      this.router.navigate(['/restaurantes'], { state: { restaurantes: this.restaurantes } });
      
    });
  }


  ngOnInit(): void {
  
  }


}
