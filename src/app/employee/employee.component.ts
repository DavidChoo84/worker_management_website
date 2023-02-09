import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeeService } from '../employee.service';
import { EmployeeReportModal } from '../modal/employee-report/employee-report.modal';
import { EmployeeReport } from '../models/employee';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
   displayedColumns: string[] = ['id', 'name', 'photo', 'create', 'edit', 'delete', 'action'];
   employeeList: Employee[] = [];
   dataSource : any;
   show: boolean = false;
   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;

   currentMonth: any;
   currentYear: any;
   monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];
   empData: EmployeeReport = {
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
     nett: 0
   };
   

   constructor(
    private employeeService: EmployeeService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal) {
    
    const date = new Date();
    this.currentMonth = this.monthNames[date.getMonth()];
    this.currentYear = date.getFullYear();
 }
  
  ngOnInit() {
    //setTimeout(() => this.dataSource.paginator = this.paginator);
    //setTimeout(() => this.dataSource.sort = this.sort);
    this.employeeService.retrieveEmployeeDetails().subscribe(res => {
      this.employeeList = Object.values(res);
      this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  open(id: any){
    this.employeeService.retrieveEmployeeReportDetails(id).subscribe(r => {
      let message = Object.values(r)[0];
      this.empData.id = message?.id;
      this.empData.gender = message?.gender;
      this.empData.name = message?.name;
      this.empData.passportNo = message?.passportNo;
      this.empData.socsoId = message?.socsoId;
      this.empData.empSocso = this.empData?.basicPay * (1.25/100);
      this.empData.empEis = this.empData?.basicPay * (1.25/100);
      this.empData.totalEarnings = this.empData?.basicPay;
      this.empData.nett = this.empData?.basicPay;

      const modal = this.modalService.open(EmployeeReportModal, {centered: true, size: "xl"});
      modal.componentInstance.data = this.empData;
      modal.componentInstance.currentMonth = this.currentMonth;
      modal.componentInstance.currentYear = this.currentYear;
  });
  }

}

export interface Employee {
  name: string;
  id: string;
  photo: string;

}


