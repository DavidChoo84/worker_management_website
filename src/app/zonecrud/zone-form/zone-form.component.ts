import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { ZonecrudService } from '../zonecrud.service';
import { PrimeNGConfig } from 'primeng/api';
import { NavbarService } from '../../navbar.service';

@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.css']
})
export class ZoneFormComponent implements OnInit {
  [x: string]: any;
  zoneForm: FormGroup;
  zoneId: any;
  buttonText = 'Create Zone';
  TitleText = 'Create New Zone';
  msgs:any;
  alertmsg!: boolean;
  eventmsg :any;
  alert:any;
  alertno:any;
  siteNameList : any = [];

  constructor(public crudService: ZonecrudService,
              public formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private primengConfig: PrimeNGConfig,
              public nav: NavbarService) {

              this.zoneForm = this.formBuilder.group({
                  zone_id:[''],
                  zone_name:[''],
                  site_id:[''],
                  // error
                  image: [null]
                })
              }

  
  ngOnInit(): void {
    this.loadSiteName();
    this.alertmsg=false;
    this.createZoneForm();
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.primengConfig.ripple = true;

    if(this.activatedRoute.snapshot.params['zoneID']){
      let zoneID =this.activatedRoute.snapshot.params['zoneID'];
      // console.log('zoneID', zoneID);
      if(zoneID !== ''){
        this.loadZoneDetails(zoneID);
      }
    }

  }

  createZoneForm(){
    this.zoneForm = this.formBuilder.group({
      'zone_id': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'zone_name': ['', Validators.compose([Validators.required, Validators.minLength(5)]) ],
      'site_id': ['', Validators.compose([Validators.required]) ],
      'zone_qrcode': ['', Validators.compose([Validators.required]) ]
    });

  }

  loadZoneDetails(zoneID:any){
    this.TitleText = "Update Zone Details"
    this.buttonText = 'Update Zone';
      this.crudService.loadZoneInfo(zoneID).subscribe(res=>{
        this.zoneForm.controls['zone_id'].setValue(res.zone_id);
        this.zoneForm.controls['zone_name'].setValue(res.zone_name);
        this.zoneId = res.zone_id;

        // const fileInput = document.querySelector('input[type="file"]');

        // // Create a new File object
        // const myFile = new File([""], res.zone_qr, {
        //     type: 'text/plain'
        // });

        // // Now let's create a DataTransfer to get a FileList
        // const dataTransfer = new DataTransfer();
        // dataTransfer.items.add(myFile);
      
      })
  }

  navigateTo(route:any){
    this.router.navigate([route])
  }
  
  //upload image
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

    this.zoneForm.patchValue({
      image: file
    });
    this.zoneForm.get('image')?.updateValueAndValidity();
  
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
   
    if(this.zoneId){

      this.zoneForm.controls['zone_id'].markAsTouched();
      this.zoneForm.controls['zone_name'].markAsTouched();
      this.zoneForm.controls['zone_qrcode'].markAsTouched();
      //for update zone details  
      this.zoneForm.value.image = this.currentFile;
      console.log(this.zoneForm.value.zone_id);
      console.log(this.zoneForm.value.zone_name);
      console.log(this.zoneForm.value.image);
      console.log(this.zoneForm.value.site_id);
      
      this.crudService.updateProductDetails(
        this.zoneForm.value.zone_id,
        this.zoneForm.value.zone_name,
        this.zoneForm.value.site_id,
        this.zoneForm.value.image
      ).subscribe((event: HttpEvent<any>): void =>{
        switch(event.type){
          case HttpEventType.UploadProgress:
            if(event.total){
              this.progress = Math.round((100 / event.total) * event.loaded);
              this.msgs = `Uploaded! ${this.progress}%`;
            }
            break;
            case HttpEventType.Response:
                event.body;
                console.log("test"+event.body);
                this.navigateTo('/zone_crud/zone-list');
          }
      })
    }
    else{
      this.zoneForm.controls['zone_id'].markAsTouched();
      this.zoneForm.controls['zone_name'].markAsTouched();
      this.zoneForm.controls['zone_qrcode'].markAsTouched();

      this.zoneForm.value.image = this.currentFile;
      console.log(this.zoneForm.value.zone_id);
      console.log(this.zoneForm.value.zone_name);
      console.log(this.zoneForm.value.image);
      console.log(this.zoneForm.value.site_id);
      
      this.crudService.createZone(
        this.zoneForm.value.zone_id,
        this.zoneForm.value.zone_name,
        this.zoneForm.value.site_id,
        this.zoneForm.value.image
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
            this.alertno = "{\"error\":\"Sorry. File is already exist\"}";
            console.log(this.eventmsg);
            console.log(this.alert);
            if(this.eventmsg.search(this.alert) != -1){
            // if(this.eventmsg===this.alert){
                this.alertmsg = false;
                this.navigateTo('/zone_crud/zone-list');
            }

            else{
                this.navigateTo('/zone_crud/create-zone');
                this.alertmsg = true;
                this.zoneForm.reset({});
            }
          }
      })
    }

  }

  closeAlert(){
    this.alertmsg=false;
  }

  loadSiteName(){
      this.crudService.loadSites().subscribe(res=>{
        this.siteNameList = res;
  
  })

  }

}
   