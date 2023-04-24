import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarPropietariosComponent } from './listar-propietarios.component';

describe('ListarPropietariosComponent', () => {
  let component: ListarPropietariosComponent;
  let fixture: ComponentFixture<ListarPropietariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarPropietariosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarPropietariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
