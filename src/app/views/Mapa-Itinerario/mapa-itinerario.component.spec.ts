import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaItinerarioComponent } from './mapa-itinerario.component';

describe('MapaItinerarioComponent', () => {
  let component: MapaItinerarioComponent;
  let fixture: ComponentFixture<MapaItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaItinerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
