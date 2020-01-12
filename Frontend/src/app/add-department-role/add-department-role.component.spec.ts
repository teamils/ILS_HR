import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDepartmentRoleComponent } from './add-department-role.component';

describe('AddDepartmentRoleComponent', () => {
  let component: AddDepartmentRoleComponent;
  let fixture: ComponentFixture<AddDepartmentRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDepartmentRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDepartmentRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
