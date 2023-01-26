import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'employee-report-modal',
  templateUrl: './employee-report.modal.html',
  styleUrls: ['./employee-report.modal.css']
})
export class EmployeeReportModal implements OnInit {

  @ViewChild('htmlData') htmlData!: ElementRef;
  @Input() data: any;
  @Input() currentMonth: any;
  @Input() currentYear: any;
  empData: any;
  constructor(
    private activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.empData = this.data;
  }

  close(){
    this.activeModal.close();
  }

  public openPDF(): void {
    let data: any = document.getElementById('paySlipData');
    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Payslip.pdf');
    });
  }
}
