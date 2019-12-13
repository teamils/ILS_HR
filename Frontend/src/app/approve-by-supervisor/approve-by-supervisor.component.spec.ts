import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBySupervisorComponent } from './approve-by-supervisor.component';

describe('ApproveBySupervisorComponent', () => {
  let component: ApproveBySupervisorComponent;
  let fixture: ComponentFixture<ApproveBySupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBySupervisorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBySupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
