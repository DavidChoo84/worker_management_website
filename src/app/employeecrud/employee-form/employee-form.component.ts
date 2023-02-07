import {HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EmployeecrudService } from '../employeecrud.service';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarService } from 'src/app/navbar.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  [x: string]: any;
  employeeForm: FormGroup;
  employeeId: any;
  buttonText: 'Add Employee';
  TitleText = 'Add New Employee';
  msgs: any;
  alertmsg!:boolean;
  eventmsg: any;
  alert: any;
  alertno: any;
  constructor(
    public employeeService: EmployeecrudService,
    public formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private primengConfig: PrimeNGConfig,
    public nav: NavbarService) {

      this.employeeForm = this.formBuilder.group({
        emp_id: [''],
        emp_name: [''],
        emp_gender: [''],
        image: [null],
        emp_passport: [''],
        emp_arrival_dt: [''],
        emp_contact_no: [''],
        enp_call_no: [''],
        emp_socsoNo: [''],
        supervisor_id: ['']
      })
     }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.createEmployeeForm();
    this.alertmsg=false;

    // if(this.activatedRoute.snapshot.params['employeeID']){
    //   let employeeID = this.activatedRoute.snapshot.params['employeeID'];
    //   if(employeeID !== ''){
    //     this.loadEmployeeDetails(employeeID);
    //   }
    // }
  }
  createEmployeeForm(){
    this.employeeForm = this.formBuilder.group({
      'emp_id': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'emp_name': ['', Validators.compose([Validators.required]) ],
      'emp_gender': ['', Validators.compose([Validators.required]) ],
      'emp_photo': ['', Validators.compose([Validators.required]) ],
      'emp_passport': ['', Validators.compose([Validators.required]) ],
      'emp_arrival_dt': ['', Validators.compose([Validators.required]) ],
      'emp_contact_no': ['', Validators.compose([Validators.required]) ],
      'emp_call_no': ['', Validators.compose([Validators.required]) ],
      'emp_socsoNo': ['', Validators.compose([Validators.required]) ],
      'supervisor_id': ['', Validators.compose([Validators.required]) ],
    })
  }

  navigateTo(router:any){
    this.router.navigate([router])
  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  preview = '';
  imageInfos?: Observable<any>;

  selectFile(event: any){
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;
    
    const file = event.target.files ? event.target.files[0] : '';

    this.employeeForm.patchValue({
      image: file
    });
    this.employeeForm.get('image')?.updateValueAndValidity();
  
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.preview = '';
        this.currentFile = file;
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.preview = e.target.result;
        };
  
        reader.readAsDataURL(this.currentFile);
        console.log(this.currentFile);
      }
    }
  }
  submitImage(){
   
    // if(this.employeeId){

    //   this.employeeForm.controls['emp_id'].markAsTouched();
    //   this.employeeForm.controls['emp_name'].markAsTouched();
    //   this.employeeForm.controls['emp_gender'].markAsTouched();
    //   this.employeeForm.controls['emp_photo'].markAsTouched();
    //   this.employeeForm.controls['emp_passport'].markAsTouched();
    //   this.employeeForm.controls['emp_arrival_dt'].markAsTouched();
    //   this.employeeForm.controls['emp_contact_no'].markAsTouched();
    //   this.employeeForm.controls['emp_call_no'].markAsTouched();
    //   this.employeeForm.controls['emp_socsoNo'].markAsTouched();
    //   this.employeeForm.controls['supervisor_id'].markAsTouched();
    //   //for update zone details  
    //   this.employeeForm.value.image = this.currentFile;
    //   console.log(this.employeeForm.value.emp_id);
    //   console.log(this.employeeForm.value.emp_name);
    //   console.log(this.employeeForm.value.emp_gender);
    //   console.log(this.employeeForm.value.emp_photo);
    //   console.log(this.employeeForm.value.emp_passport);
    //   console.log(this.employeeForm.value.emp_arrival_dt);
    //   console.log(this.employeeForm.value.emp_contact_no);
    //   console.log(this.employeeForm.value.emp_call_no);
    //   console.log(this.employeeForm.value.emp_socsoNo);
    //   console.log(this.employeeForm.value.supervisor_id);
      
      
    //   this.employeeService.updateProductDetails(
    //     this.zoneForm.value.zone_id,
    //     this.zoneForm.value.zone_name,
    //     this.zoneForm.value.site_id,
    //     this.zoneForm.value.image
    //   ).subscribe((event: HttpEvent<any>): void =>{
    //     switch(event.type){
    //       case HttpEventType.UploadProgress:
    //         if(event.total){
    //           this.progress = Math.round((100 / event.total) * event.loaded);
    //           this.msgs = `Uploaded! ${this.progress}%`;
    //         }
    //         break;
    //         case HttpEventType.Response:
    //             event.body;
    //             console.log("test"+event.body);
    //             this.navigateTo('/zone_crud/zone-list');
    //       }
    //   })
    // }
    // else{
      this.employeeForm.controls['emp_id'].markAsTouched();
      this.employeeForm.controls['emp_name'].markAsTouched();
      this.employeeForm.controls['emp_gender'].markAsTouched();
      this.employeeForm.controls['emp_photo'].markAsTouched();
      this.employeeForm.controls['emp_passport'].markAsTouched();
      this.employeeForm.controls['emp_arrival_dt'].markAsTouched();
      this.employeeForm.controls['emp_contact_no'].markAsTouched();
      this.employeeForm.controls['emp_call_no'].markAsTouched();
      this.employeeForm.controls['emp_socsoNo'].markAsTouched();
      this.employeeForm.controls['supervisor_id'].markAsTouched();

      this.employeeForm.value.image = this.currentFile;
      console.log(this.employeeForm.value.emp_id);
      console.log(this.employeeForm.value.emp_name);
      console.log(this.employeeForm.value.emp_gender);
      console.log(this.employeeForm.value.image);
      console.log(this.employeeForm.value.emp_passport);
      console.log(this.employeeForm.value.emp_arrival_dt);
      console.log(this.employeeForm.value.emp_contact_no);
      console.log(this.employeeForm.value.emp_call_no);
      console.log(this.employeeForm.value.emp_socsoNo);
      console.log(this.employeeForm.value.supervisor_id);
      
      this.employeeService.createEmployee(
        this.employeeForm.value.emp_id,
        this.employeeForm.value.emp_name,
        this.employeeForm.value.emp_gender,
        this.employeeForm.value.image,
        this.employeeForm.value.emp_passport,
        this.employeeForm.value.emp_arrival_dt,
        this.employeeForm.value.emp_contact_no,
        this.employeeForm.value.emp_call_no,
        this.employeeForm.value.emp_socsoNo,
        this.employeeForm.value.supervisor_id
      ).subscribe((event: HttpEvent<any>): void =>{
        switch(event.type){
          case HttpEventType.UploadProgress:
            // if(event.total){
            //   this.progress = Math.round((100 / event.total) * event.loaded);
            //   this.msgs = `Uploaded! ${this.progress}%`;
            // }
            break;
          case HttpEventType.Response:
            event.body;
            this.eventmsg = event.body;
            this.alert = "{\"result\":\"success1\"}File has been uploaded"; 
            //this.alertno = "{\"error\":\"Sorry. File is already exist\"}";
            console.log(this.eventmsg);
            console.log(this.alert);
            if(this.eventmsg.search(this.alert) != -1){
            // if(this.eventmsg===this.alert){
                this.alertmsg = false;
                this.navigateTo('/employee_crud/employee-list');
            }

            else{
                this.navigateTo('/employee_crud/add-employee');
                this.alertmsg = true;
                this.employeeForm.reset({});
            }
          }
      })
    //}

  }

  closeAlert(){
    this.alertmsg=false;
  }

}
