import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { EmployeecrudService } from '../employeecrud.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { NavbarService } from 'src/app/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  [y: string]: any;
  employeeId: any;
  employeeForm1!: FormGroup;
  imageInfos: any;
  url: any;

  constructor(
    private employeecrudService: EmployeecrudService,
    private activatedRoute: ActivatedRoute,
    public nav: NavbarService) {
      this.initializeForm();
     }
  
  initializeForm(){
    this.employeeForm1 = new FormGroup({
      emp_id: new FormControl(),
      emp_name: new FormControl(),
      emp_photo: new FormControl(),
      emp_gender: new FormControl(),
      emp_passport: new FormControl(),
      emp_arrival_dt: new FormControl(),
      emp_call_no: new FormControl(),
      emp_contact_no: new FormControl(),
      emp_socsoNo: new FormControl(),
      supervisor_id: new FormControl()
    })
  }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    if(this.activatedRoute.snapshot.params['employeeID']){
      let employeeID = this.activatedRoute.snapshot.params['employeeID'];
      if(employeeID !== ''){
        this.loadEmployeeDetails(employeeID);
      }
    }
  }

  loadEmployeeDetails(employeeID: any){
    this.employeecrudService.loadEmployeeInfo(employeeID).subscribe(res=>{
      this.employeeForm1.controls['emp_id'].setValue(res.emp_id);
      this.employeeForm1.controls['emp_name'].setValue(res.emp_name);
      this.employeeForm1.controls['emp_photo'].setValue(res.emp_photo);
      this.employeeForm1.controls['emp_gender'].setValue(res.emp_gender);
      this.employeeForm1.controls['emp_passport'].setValue(res.emp_passport);
      this.employeeForm1.controls['emp_arrival_dt'].setValue(res.emp_arrival_dt);
      this.employeeForm1.controls['emp_call_no'].setValue(res.emp_call_no);
      this.employeeForm1.controls['emp_contact_no'].setValue(res.emp_contact_no);
      this.employeeForm1.controls['emp_socsoNo'].setValue(res.emp_socsoNo);
      this.employeeForm1.controls['supervisor_id'].setValue(res.supervisor_id)
      this.employeeId = res.emp_id;
      this.imageInfos = res.emp_photo;
      this.url = environment.API_EndPoint + 'uploads/'+this.imageInfos;

    })
  }

}
