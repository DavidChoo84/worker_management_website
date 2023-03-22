import { Component, OnInit } from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ZonehomeService } from '../zonehome.service';
import { ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class ZoneDetailComponent implements OnInit {
  sitename : any;
  zoneID : any;
  clockrecord : any;
  assignrecord :any;
  readonly time = new Date();
  date: string;
  result: string;
  AssignForm: FormGroup;
  AssignBatchForm : FormGroup;
  eventmsg : any;
  Emplist : any = [];
  SelectedEmp : any = [];
  adminList: any = [];
  adm_id:any;
  
  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  panelOpenState: boolean = false;
  constructor(public formBuilder: FormBuilder,private crudService: ZonehomeService,private api: ApiService,private activatedRoute: ActivatedRoute,private confirmationService: ConfirmationService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.date = this.time.toLocaleDateString();

      const [month, day, year] = this.date.split('/');

      this.result = [day, month, year].join('/');

  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
          this.assignEmp();
          this.AssignForm.reset({});
        },
        reject: () => {
          this.messageService.add({severity:'success', summary:'Rejected', detail:'You have rejected'});
      }
    });
}

confirm2() {
  this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({severity:'success', summary:'Confirmed', detail:'You have accepted'});
        this.assignBatch();
        this.AssignBatchForm.reset({});
      },
      reject: () => {
        this.messageService.add({severity:'success', summary:'Rejected', detail:'You have rejected'});
    }
  });
}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.createAssignForm();

    if(this.activatedRoute.snapshot.params['zone_id']){
      if(this.activatedRoute.snapshot.params['site_name']){
        let zone_id =this.activatedRoute.snapshot.params['zone_id'];
        let site_name =this.activatedRoute.snapshot.params['site_name'];
        if(zone_id !== '' && site_name !== ''){
          this.loadZoneDetails(zone_id,site_name);
        }
      }
    }
    this.loadEmpName();
    this.getAdmin();
  }
  displayBasic: boolean;

  showBasicDialog() {
    this.displayBasic = true;
  }

  loadZoneDetails(zone_id:any, site_name:any){
    this.crudService.loadSiteInfo(zone_id, site_name).subscribe(res=>{
      this.sitename = res.site_name;
      this.zoneID = res.zone_id;
      this.clockrecord = res.ClockRecord;
      this.assignrecord = res.AssignRecords;
    })
  }

  createAssignForm(){
    this.AssignForm = this.formBuilder.group({
      'empid': ['', Validators.compose([Validators.required, Validators.minLength(5)]) ],
      'time': ['', Validators.compose([Validators.required]) ],
    });

    this.AssignBatchForm = this.formBuilder.group({
      'empid': ['', Validators.compose([Validators.required]) ],
      'time': ['', Validators.compose([Validators.required]) ],
    });

  }

  loadEmpName(){
      this.crudService.loadEmp().subscribe(res=>{
        this.Emplist = res;
    })

  }

  assignEmp(){
      this.crudService.assignEmp(
        this.AssignForm.value.empid,
        this.AssignForm.value.time ,
        this.zoneID,
        this.adm_id
      ).subscribe((event: HttpEvent<any>): void =>{
        switch(event.type){
          case HttpEventType.UploadProgress:
           
            break;
          case HttpEventType.Response:
            event.body;
            this.eventmsg = event.body;
            // if(this.eventmsg.search(this.alert) != -1){
            // // if(this.eventmsg===this.alert){
            //     this.alertmsg = false;
            //     this.navigateTo('/zone_crud/zone-list');
            // }

            // else{
            //     this.navigateTo('/zone_crud/create-zone');
            //     this.alertmsg = true;
            //     this.zoneForm.reset({});
            // }
          }
      })
  }

  assignBatch(){

    for (var i = 0; i <= this.AssignBatchForm.value.empid.length; i++) {
      this.crudService.assignBatch(
        this.AssignBatchForm.value.empid[i].emp_id,
        this.AssignBatchForm.value.time ,
        this.zoneID,
        this.adm_id
      ).subscribe((event: HttpEvent<any>): void =>{
        switch(event.type){
          case HttpEventType.UploadProgress:
           
            break;
          case HttpEventType.Response:
            event.body;
            this.eventmsg = event.body;
          }
      })
    }
  }

  getAdmin(){
    this.adminList = [this.api.getUserData()];
    this.adm_id = this.adminList[0].adm_id;
  }
}
