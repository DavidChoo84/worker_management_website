import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/navbar.service';
import { EmployeecrudService } from '../employeecrud.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(public nav: NavbarService, public employeeService: EmployeecrudService) { }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful(); 
  }

}
