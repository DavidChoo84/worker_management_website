import { Component, OnInit, Input,  ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EmployeeReport, Employee } from '../../models/employee';
import { EmployeeService } from '../../employee.service';

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
  @Input() id: any;
  @Input() firstDay: any;
  @Input() lastDay: any; // get the data from employee list
  totalWorkingTime: number = 0;
  normalTime: number = 0;
  normalOvertime: number = 0;
  restDayOT: number = 0;
  publicOT: number = 0;

  rangeDates: Date[];
  empData: EmployeeReport = { // initialize the value of employee
    id: "",
    gender: "Male",
    name: "",
    passportNo: "",
    socsoId: "",
    basicPay: 1500,
    overtime: 0,
    empSocso: 0,
    empEis: 0,  
    totalEarnings: 0,
    nett: 0,
    restDayOT: 0,
    publicOT: 0
  };
  constructor(
    private activeModal: NgbActiveModal,
    private employeeService: EmployeeService,
  ) { 
    const date = new Date();
    this.rangeDates = [ this.firstDay, this.lastDay];   
  }

  ngOnInit(): void {
      this.employeeService.retrieveWorkingTime(this.id, this.firstDay, this.lastDay).subscribe(r => { 
        // retrieve first "Clock In" and last "Clock Out" from first day to last day
        this.normalTime = 0;
        this.normalOvertime = 0;
        this.totalWorkingTime = 0;
        if(r){
          for (let i = 0; i < Object.values(r).length; i++){      
            var day = new Date(Object.values(r)[i].min_date).getDay(); // get weekday (eg: 0 == Sunday...)
            var minMinutes = 0;
            var maxMinutes = 0;
            var minHour = (new Date(Object.values(r)[i].min_date).getHours())*60;
            var maxHour = (new Date(Object.values(r)[i].max_date).getHours())*60;
            
            if (minHour < 480){ // if "Clock In" time is less than 08:00 (8*60 = 480), will take 08:00
              minHour = minHour + 60;
            } 
            
            var minTotal = minHour + minMinutes;
            var maxTotal = maxHour + maxMinutes;
            
            var diff = (Math.floor((maxTotal - minTotal)/60)) - 1;
            this.totalWorkingTime += diff; //each day total working time
            if (diff > 8){ // if each day working time over 8 hours
              var overtimeDiff = diff - 8; //calculate the OT hour
              this.normalTime += 8;
              if (day == 0){ // if Sunday OT
                this.restDayOT += overtimeDiff;
              } else{ // normal OT
                this.normalOvertime += overtimeDiff;
              }
            } else{ // if working hour not exceeds 8 hours
              this.normalTime += diff;
            } 
          }
          this.calculate();
        }
        
      })
      
    

    this.employeeService.retrieveEmployeeReportDetails(this.id).subscribe(r => { // retrieve report details
      let message = Object.values(r)[0];
      this.empData.id = message?.id;
      this.empData.gender = message?.gender;
      this.empData.name = message?.name;
      this.empData.passportNo = message?.passportNo;
      this.empData.socsoId = message?.socsoId; 
  });
  }

  close(){
    this.activeModal.close();
  }

  calculate(){ // calculate OT and earnings
    this.empData.basicPay = 1500;
    this.empData.overtime = this.normalOvertime * 10.82;
    this.empData.restDayOT = this.restDayOT * 14.42;
    this.empData.publicOT = this.publicOT * 21.63
    this.empData.totalEarnings = this.empData.basicPay + this.empData.overtime + this.empData.restDayOT + this.empData.publicOT;
    this.empData.nett = this.empData.totalEarnings;
    this.empData.empSocso = this.empData.totalEarnings * (1.25/100);
    this.empData.empEis = this.empData.totalEarnings * (1.25/100);
  }

  checkTotalTime(){
    var total = this.normalTime + this.normalOvertime + this.restDayOT + this.publicOT;
    if (this.totalWorkingTime < total){
      alert("Total working time is incorrect!");
    } else {
      this.openPDF();
    }
  }

  public openPDF(): void { //download PDF
    let data: any = document.getElementById('paySlipData');
    html2canvas(data).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Payslip_' + this.currentMonth + "_" + this.id + '.pdf');
    });
  }
}
