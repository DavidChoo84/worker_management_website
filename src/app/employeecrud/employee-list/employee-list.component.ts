import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeecrudService } from '../employeecrud.service';
import { EmployeeReportModal } from 'src/app/modal/employee-report/employee-report.modal';
import { EmployeeReport } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/employee.service';
import { NavbarService } from 'src/app/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';
import Swal from 'sweetalert2';

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
    public nav: NavbarService,
    public employeeService: EmployeecrudService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    public employeeService1: EmployeeService
  ) {

    const date = new Date();
    this.currentMonth = this.monthNames[date.getMonth()];
    this.currentYear = date.getFullYear();
   }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.employeeService.retrieveEmployeeDetails().subscribe(res => {
      this.employeeList = Object.values(res);
      this.dataSource = new MatTableDataSource<Employee>(this.employeeList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    })
  }
  getEmployeeList(){
    this.employeeListSubscribe = this.employeeService.retrieveEmployeeDetails().subscribe(res => {
      this.dataSource = res;
      console.log(res);
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
        console.log(params,photo);
        this.employeeService.deleteEmployee(params,photo).subscribe(res =>{
          console.log("remove");
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

  open(id: any){
    this.employeeService1.retrieveEmployeeReportDetails(id).subscribe(r => {
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
