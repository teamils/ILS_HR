import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveByManagerComponent } from './approve-by-manager.component';

describe('ApproveByManagerComponent', () => {
  let component: ApproveByManagerComponent;
  let fixture: ComponentFixture<ApproveByManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveByManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveByManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
