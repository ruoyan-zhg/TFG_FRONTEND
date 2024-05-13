import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaRestaurantesComponent } from './mapa-restaurantes.component';

describe('MapaRestaurantesComponent', () => {
  let component: MapaRestaurantesComponent;
  let fixture: ComponentFixture<MapaRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaRestaurantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
