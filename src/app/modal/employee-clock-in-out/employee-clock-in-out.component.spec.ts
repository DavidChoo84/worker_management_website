import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeClockInOutComponent } from './employee-clock-in-out.component';

describe('EmployeeClockInOutComponent', () => {
  let component: EmployeeClockInOutComponent;
  let fixture: ComponentFixture<EmployeeClockInOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeClockInOutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeClockInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
