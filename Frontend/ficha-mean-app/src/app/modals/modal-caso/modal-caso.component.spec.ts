import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCasoComponent } from './modal-caso.component';

describe('ModalCasoComponent', () => {
  let component: ModalCasoComponent;
  let fixture: ComponentFixture<ModalCasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCasoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
