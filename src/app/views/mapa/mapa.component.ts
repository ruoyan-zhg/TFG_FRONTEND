import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Feature, FeatureCollection, GeoJsonProperties, Point, LineString } from 'geojson';

interface CoordenadaMapa {
  coords: [number, number];
  name: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {
  map: mapboxgl.Map | undefined;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat: number = 40.4168;
  lng: number = -3.7038;
  coordinatesSourceId = 'custom-coordinates';
  routeSourceId = 'route';

  // Variable con un listado de coordenadas de Madrid y sus nombres
  coordinatesMadrid: { coords: [number, number], name: string }[] = [
    { coords: [-3.703790, 40.416775], name: 'Puerta del Sol' },
    { coords: [-3.688344, 40.421381], name: 'Parque del Retiro' },
    { coords: [-3.694112, 40.417282], name: 'Museo del Prado' },
    { coords: [-3.711202, 40.429528], name: 'Templo de Debod' },
    { coords: [-3.687137, 40.408731], name: 'Estación de Atocha' },
    { coords: [-3.703948, 40.415363], name: 'Plaza Mayor' },
    { coords: [-3.707396, 40.424254], name: 'Gran Vía' }
  ];

  // Local copy of GeoJSON data
  geoJsonData: FeatureCollection<Point, GeoJsonProperties> = {
    type: 'FeatureCollection',
    features: []
  };

  ngOnInit() {
    this.coordinatesMadrid = history.state.info || [];
    this.lng = this.coordinatesMadrid[0].coords[0];
    this.lat = this.coordinatesMadrid[0].coords[1];
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoib3NjYXJnMTA3IiwiYSI6ImNscGZveXBxMTFtaTYya3FyYXJqa29oaGgifQ.0H09n35BQJNh8k9nkkbsrg',
      container: 'map',
      style: this.style,
      zoom: 14, // Ajustamos el zoom para una vista más cercana de Madrid
      center: [this.lng, this.lat]
    });

    this.map.on('load', () => {
      this.map?.addSource(this.coordinatesSourceId, {
        type: 'geojson',
        data: this.geoJsonData
      });

      this.map?.loadImage(
        'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
        (error, image) => {
          if (error) throw error;
          this.map?.addImage('custom-marker', image as HTMLImageElement);
          
          this.map?.addLayer({
            'id': this.coordinatesSourceId,
            'type': 'symbol',
            'source': this.coordinatesSourceId,
            'layout': {
              'icon-image': 'custom-marker',
              'icon-size': 0.5,
              'text-field': ['get', 'name'],
              'text-offset': [0, 1.5],
              'text-anchor': 'top'
            }
          });
        }
      );

      // Añadir puntos iniciales de la variable coordinatesMadrid
      this.loadInitialCoordinates();
      
      // Generar ruta óptima y añadir al mapa
      //this.generateRoute();
    });
  }

  loadInitialCoordinates() {
    const features: Feature<Point, GeoJsonProperties>[] = this.coordinatesMadrid.map(location => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: location.coords
      },
      properties: {
        name: location.name
      }
    }));

    this.geoJsonData.features = features;

    (this.map?.getSource(this.coordinatesSourceId) as mapboxgl.GeoJSONSource).setData(this.geoJsonData);
  }

  async generateRoute() {
    const coordinates = this.coordinatesMadrid.map(location => location.coords.join(',')).join(';');
    const accessToken = 'pk.eyJ1Ijoib3NjYXJnMTA3IiwiYSI6ImNscGZveXBxMTFtaTYya3FyYXJqa29oaGgifQ.0H09n35BQJNh8k9nkkbsrg';

    const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}?geometries=geojson&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();

    const route: LineString = data.trips[0].geometry;

    this.map?.addSource(this.routeSourceId, {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: route,
        properties: {}
      } as Feature<LineString, GeoJsonProperties>
    });

    this.map?.addLayer({
      'id': this.routeSourceId,
      'type': 'line',
      'source': this.routeSourceId,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round'
      },
      'paint': {
        'line-color': '#888',
        'line-width': 8
      }
    });
  }

  addCoordinates() {
    const input = (document.getElementById('coordinates') as HTMLTextAreaElement).value;
    const coordinatePairs = input.split(';');
    const newLocations = coordinatePairs.map(pair => {
      const [lng, lat, name] = pair.split(',').map((val, index) => index < 2 ? Number(val) : val);
      return {
        coords: [lng as number, lat as number] as [number, number],
        name: name as string
      };
    });

    newLocations.forEach(location => {
      this.geoJsonData.features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: location.coords
        },
        properties: {
          name: location.name
        }
      });
    });

    (this.map?.getSource(this.coordinatesSourceId) as mapboxgl.GeoJSONSource).setData(this.geoJsonData);

    // Actualizar la ruta con los nuevos puntos añadidos
    this.coordinatesMadrid.push(...newLocations);
    this.generateRoute();
  }
}
