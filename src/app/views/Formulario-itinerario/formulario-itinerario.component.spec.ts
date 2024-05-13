import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioItinerarioComponent } from './formulario-itinerario.component';

describe('FormularioItinerarioComponent', () => {
  let component: FormularioItinerarioComponent;
  let fixture: ComponentFixture<FormularioItinerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioItinerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
