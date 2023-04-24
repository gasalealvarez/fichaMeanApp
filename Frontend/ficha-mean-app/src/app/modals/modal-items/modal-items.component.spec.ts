import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalItemsComponent } from './modal-items.component';

describe('ModalItemsComponent', () => {
  let component: ModalItemsComponent;
  let fixture: ComponentFixture<ModalItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
