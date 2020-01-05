import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPersonalInformationComponent } from './edit-personal-information.component';

describe('EditPersonalInformationComponent', () => {
  let component: EditPersonalInformationComponent;
  let fixture: ComponentFixture<EditPersonalInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPersonalInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPersonalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
