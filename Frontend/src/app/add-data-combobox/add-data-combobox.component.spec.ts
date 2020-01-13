import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataComboboxComponent } from './add-data-combobox.component';

describe('AddDataComboboxComponent', () => {
  let component: AddDataComboboxComponent;
  let fixture: ComponentFixture<AddDataComboboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataComboboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataComboboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
