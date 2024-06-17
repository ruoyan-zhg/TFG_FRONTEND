import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './views/Inicio/inicio.component';
import { LoginComponent } from './views/Login/login.component';
import { RegistroComponent } from './views/Registro/registro.component';
import { ActividadesComponent } from './views/Actividades/actividades.component';
import { FavoritosComponent } from './views/Favoritos/favoritos.component';
import { FavoritosItinerariosComponent } from './views/Favoritos-itinerarios/favoritos-itinerarios.component';
import { FormularioActividadesComponent } from './views/Formulario-actividades/formulario-actividades.component';
import { FormularioItinerarioComponent } from './views/Formulario-itinerario/formulario-itinerario.component';
import { FormularioRestaurantesComponent } from './views/Formulario-restaurantes/formulario-restaurantes.component';
import { HistorialComponent } from './views/Historial/historial.component';
import { HistorialItinerariosComponent } from './views/Historial-itinerarios/historial-itinerarios.component';
import { ItinerarioComponent } from './views/Itinerario/itinerario.component';
import { MapaActividadesComponent } from './views/Mapa-Actividades/mapa-actividades.component';
import { MapaItinerarioComponent } from './views/Mapa-Itinerario/mapa-itinerario.component';
//import { MapaItinerarioComponent } from './views/mapa-itinerario/mapa-itinerario.component';
import { MapaRestaurantesComponent } from './views/Mapa-restaurantes/mapa-restaurantes.component';
import { RestaurantesComponent } from './views/Restaurantes/restaurantes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MapaComponent } from './views/mapa/mapa.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    ActividadesComponent,
    FavoritosComponent,
    FavoritosItinerariosComponent,
    FormularioActividadesComponent,
    FormularioItinerarioComponent,
    FormularioRestaurantesComponent,
    HistorialComponent,
    HistorialItinerariosComponent,
    ItinerarioComponent,
    MapaActividadesComponent,
    //MapaitinerarioComponent,
    MapaItinerarioComponent,
    MapaRestaurantesComponent,
    RestaurantesComponent,
    MapaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
