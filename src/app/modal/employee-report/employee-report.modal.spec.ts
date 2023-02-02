import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeReportModal } from './employee-report.modal';

describe('EmployeeReportModal', () => {
  let component: EmployeeReportModal;
  let fixture: ComponentFixture<EmployeeReportModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeReportModal ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeReportModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
