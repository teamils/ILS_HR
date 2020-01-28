import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DcManagerComponent } from './dc-manager.component';

describe('DcManagerComponent', () => {
  let component: DcManagerComponent;
  let fixture: ComponentFixture<DcManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DcManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DcManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
