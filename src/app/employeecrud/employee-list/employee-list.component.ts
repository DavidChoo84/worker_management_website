import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeecrudService } from '../employeecrud.service';
import { EmployeeReportModal } from 'src/app/modal/employee-report/employee-report.modal';
import { EmployeeClockInOutComponent } from 'src/app/modal/employee-clock-in-out/employee-clock-in-out.component';
import { EmployeeReport } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/employee.service';
import { NavbarService } from 'src/app/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';
import Swal from 'sweetalert2';
import { DateRangePickerComponent } from 'src/app/modal/date-range-picker/date-range-picker.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'photo', 'create', 'edit', 'delete', 'action'];
  employeeList: Employee[] = [];
  dataSource : any = [];
  show: boolean = false;
  employeeListSubscribe: any;
  rangeDates: Date[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentMonth: any;
  currentYear: any;
  firstDay: any;
  lastDay: any;
  monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JULY", "AUG", "SEPT", "OCT", "NOV", "DEC"];

  constructor(
    public nav: NavbarService,
    public employeeService: EmployeecrudService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    public employeeService1: EmployeeService
  ) {

    const date = new Date();
    this.currentMonth = this.monthNames[date.getMonth()];
    this.currentYear = date.getFullYear();
    let firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.firstDay = firstDate.getFullYear() + "-" + (firstDate.getMonth() + 1) + "-" + firstDate.getDate();
    this.lastDay = lastDay.getFullYear() + "-" + (lastDay.getMonth() + 1) + "-" + lastDay.getDate();
    this.rangeDates = [ firstDate, lastDay];  
   }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.employeeService.retrieveEmployeeDetails().subscribe(res => {
      this.employeeList = Object.values(res);
      this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  getEmployeeList(){
    this.employeeListSubscribe = this.employeeService.retrieveEmployeeDetails().subscribe(res => {
      this.dataSource = res;
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  deleteEmployee(params:any,photo:any){
    // const that = this;
    Swal.fire({
      title: 'Are you sure to delete this?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(params,photo).subscribe(res =>{
          if(res.result === 'success'){
            this.getEmployeeList();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success');
          }
        });
      }
    });
  }

  openDate(){ //open date popup to select date
    const modalRef = this.modalService.open(DateRangePickerComponent, {centered: true, size: "md"});
    modalRef.componentInstance.rangeDates = this.rangeDates; //pass the first day and last day of current month
    modalRef.result.then(date => {
      this.rangeDates = date; // date == selected Date
      this.firstDay = this.rangeDates[0].getFullYear() + "-" + (this.rangeDates[0].getMonth() + 1) + "-" + this.rangeDates[0].getDate();
      this.lastDay = this.rangeDates[1].getFullYear() + "-" + (this.rangeDates[1].getMonth() + 1) + "-" + this.rangeDates[1].getDate();
    })
  }

  open(id: any){ //open the Report Preview
    const modal = this.modalService.open(EmployeeReportModal, {centered: true, size: "xl"});
      modal.componentInstance.currentMonth = this.currentMonth; // pass current month to Preview 
      modal.componentInstance.currentYear = this.currentYear; // pass current year to Preview
      modal.componentInstance.id = id; // pass the employee ID to Preview
      modal.componentInstance.firstDay = this.firstDay;
      modal.componentInstance.lastDay = this.lastDay;
  }

  openReport(id: any){ //open the Report Preview
    const modal = this.modalService.open(EmployeeClockInOutComponent, {centered: true, size: "xl"});
      modal.componentInstance.currentMonth = this.currentMonth; // pass current month to Preview 
      modal.componentInstance.currentYear = this.currentYear; // pass current year to Preview
      modal.componentInstance.id = id; // pass the employee ID to Preview
      modal.componentInstance.firstDay = this.firstDay;
      modal.componentInstance.lastDay = this.lastDay;
  }

  openAllReport(){ //open the Report Preview
    const modal = this.modalService.open(EmployeeClockInOutComponent, {centered: true, size: "xl"});
      modal.componentInstance.currentMonth = this.currentMonth; // pass current month to Preview 
      modal.componentInstance.currentYear = this.currentYear; // pass current year to Preview
      modal.componentInstance.firstDay = this.firstDay;
      modal.componentInstance.lastDay = this.lastDay;
  }
}
