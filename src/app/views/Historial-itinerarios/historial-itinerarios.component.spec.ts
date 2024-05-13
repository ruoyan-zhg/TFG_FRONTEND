import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialItinerariosComponent } from './historial-itinerarios.component';

describe('HistorialItinerariosComponent', () => {
  let component: HistorialItinerariosComponent;
  let fixture: ComponentFixture<HistorialItinerariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialItinerariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialItinerariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
