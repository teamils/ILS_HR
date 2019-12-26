import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceShowLeavenumberComponent } from './attendance-show-leavenumber.component';

describe('AttendanceShowLeavenumberComponent', () => {
  let component: AttendanceShowLeavenumberComponent;
  let fixture: ComponentFixture<AttendanceShowLeavenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceShowLeavenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceShowLeavenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
