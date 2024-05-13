import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaActividadesComponent } from './mapa-actividades.component';

describe('MapaActividadesComponent', () => {
  let component: MapaActividadesComponent;
  let fixture: ComponentFixture<MapaActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaActividadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
