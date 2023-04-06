import { Component, OnInit, Input,  ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeReport, Employee } from '../../models/employee';
import { EmployeeService } from '../../employee.service';
import { EmployeeClockInOut } from '../../models/employee';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-employee-clock-in-out',
  templateUrl: './employee-clock-in-out.component.html',
  styleUrls: ['./employee-clock-in-out.component.css']
})
export class EmployeeClockInOutComponent implements OnInit {

  rangeDates: Date[];
  exportList: any;
  results: EmployeeClockInOut[];
  @Input() currentMonth: any;
  @Input() currentYear: any;
  @Input() id: any;
  @Input() firstDay: any;
  @Input() lastDay: any; // get the data from employee list
  constructor(
    private activeModal: NgbActiveModal,
    private employeeService: EmployeeService,
  ) {
    this.rangeDates = [ this.firstDay, this.lastDay]; 
   }

  ngOnInit(): void {
    if (this.id == undefined){
      this.employeeService.retrieveAllWorkingTime(this.firstDay, this.lastDay).subscribe(res => {
        this.results = Object.values(res);
        for (var x = 0; x < this.results.length; x++) {
          var minTotal = (new Date(this.results[x].min_date).getHours())*60;
          var maxTotal = (new Date(this.results[x].max_date).getHours())*60;
          if (minTotal < 480) { // if "Clock In" time is less than 08:00 (8*60 = 480), will take 08:00
            minTotal = minTotal + 60;
        }
          
          var diff = (Math.floor((maxTotal - minTotal)/60)) - 1;
          this.results[x].totalWorkingHours = diff;
        }
      })
    } else {
      this.employeeService.retrieveWorkingTime(this.id, this.firstDay, this.lastDay).subscribe(res => {
        this.results = Object.values(res);
        for (var x = 0; x < this.results.length; x++){
          var minTotal = (new Date(this.results[x].min_date).getHours())*60;
          var maxTotal = (new Date(this.results[x].max_date).getHours())*60;
          if (minTotal < 480){ // if "Clock In" time is less than 08:00 (8*60 = 480), will take 08:00
            minTotal = minTotal + 60;
          } 
          var diff = (Math.floor((maxTotal - minTotal)/60)) - 1;
          this.results[x].totalWorkingHours = diff;
        }
      })
    }
    
  }

  close(){
    this.activeModal.close();
  }

  export(){
    var data = this.results;
    this.exportList = [];
    data.forEach(x => {
      this.exportList.push({
        "Employee ID": x.emp_id,
        "First Zone Name": x.min_zoneName,
        "First Clock In": x.min_date,
        "Last Zone Name": x.max_zoneName,
        "Last Clock Out": x.max_date,
        "Total Working Hours": x.totalWorkingHours
      });
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.exportList);
    const wd: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wd, ws, 'Employee Report');
    XLSX.writeFile(wd, "Employee Report " + new Date().toISOString().slice(0, 10) + ".xlsx")
  }

}
