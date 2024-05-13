import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosItinerariosComponent } from './favoritos-itinerarios.component';

describe('FavoritosItinerariosComponent', () => {
  let component: FavoritosItinerariosComponent;
  let fixture: ComponentFixture<FavoritosItinerariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritosItinerariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritosItinerariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
