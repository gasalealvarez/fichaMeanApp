import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarHistorialComponent } from './listar-historial.component';

describe('ListarHistorialComponent', () => {
  let component: ListarHistorialComponent;
  let fixture: ComponentFixture<ListarHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarHistorialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
