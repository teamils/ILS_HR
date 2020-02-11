import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportEmployeeMasterComponent } from './report-employee-master.component';

describe('ReportEmployeeMasterComponent', () => {
  let component: ReportEmployeeMasterComponent;
  let fixture: ComponentFixture<ReportEmployeeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportEmployeeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportEmployeeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
