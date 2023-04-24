import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarSanidadComponent } from './listar-sanidad.component';

describe('ListarSanidadComponent', () => {
  let component: ListarSanidadComponent;
  let fixture: ComponentFixture<ListarSanidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarSanidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarSanidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
