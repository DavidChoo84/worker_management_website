import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { EmployeecrudService } from '../employeecrud.service';
import { EmployeeReportModal } from 'src/app/modal/employee-report/employee-report.modal';
import { EmployeeReport } from 'src/app/models/employee';
import { NavbarService } from 'src/app/navbar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'photo', 'create', 'edit', 'delete', 'action'];
  employeeList: Employee[] = [];
  dataSource : any;
  show: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public nav: NavbarService,
    public employeeService: EmployeecrudService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
