import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioRestaurantesComponent } from './formulario-restaurantes.component';

describe('FormularioRestaurantesComponent', () => {
  let component: FormularioRestaurantesComponent;
  let fixture: ComponentFixture<FormularioRestaurantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioRestaurantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioRestaurantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
