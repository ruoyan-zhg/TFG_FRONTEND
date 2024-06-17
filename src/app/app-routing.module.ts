import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './views/Inicio/inicio.component';
import { ActividadesComponent } from './views/Actividades/actividades.component';
import { FavoritosComponent } from './views/Favoritos/favoritos.component';
import { FavoritosItinerariosComponent } from './views/Favoritos-itinerarios/favoritos-itinerarios.component';
import { FormularioActividadesComponent } from './views/Formulario-actividades/formulario-actividades.component';
import { FormularioItinerarioComponent } from './views/Formulario-itinerario/formulario-itinerario.component';
import { FormularioRestaurantesComponent } from './views/Formulario-restaurantes/formulario-restaurantes.component';
import { HistorialComponent } from './views/Historial/historial.component';
import { HistorialItinerariosComponent } from './views/Historial-itinerarios/historial-itinerarios.component';
import { ItinerarioComponent } from './views/Itinerario/itinerario.component';
import { LoginComponent } from './views/Login/login.component';
import { MapaActividadesComponent } from './views/Mapa-Actividades/mapa-actividades.component';
import { MapaItinerarioComponent } from './views/Mapa-Itinerario/mapa-itinerario.component';
import { MapaRestaurantesComponent } from './views/Mapa-restaurantes/mapa-restaurantes.component';
import { RegistroComponent } from './views/Registro/registro.component';
import { RestaurantesComponent } from './views/Restaurantes/restaurantes.component';
import { MapaComponent } from './views/mapa/mapa.component';



const routes: Routes = [
  {path: '', component:InicioComponent},
  {path: 'inicio', component:InicioComponent},
  {path: 'actividades', component:ActividadesComponent},
  {path: 'favoritos', component:FavoritosComponent},
  {path: 'favoritos-itinerarios', component:FavoritosItinerariosComponent},
  {path: 'formulario-actividades', component:FormularioActividadesComponent},
  {path: 'formulario-itinerario', component:FormularioItinerarioComponent},
  {path: 'formulario-restaurantes', component:FormularioRestaurantesComponent},
  {path: 'historial', component:HistorialComponent},
  {path: 'historial-itinerarios', component:HistorialItinerariosComponent},
  {path: 'itinerario', component:ItinerarioComponent},
  {path: 'login', component:LoginComponent},
  {path: 'mapa-actividades', component:MapaActividadesComponent},
  {path: 'mapa-itinerario', component:MapaItinerarioComponent},
  {path: 'mapa-restaurantes', component:MapaRestaurantesComponent},
  {path: 'registro', component:RegistroComponent},
  {path: 'restaurantes', component:RestaurantesComponent},
  {path: 'mapa', component:MapaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
