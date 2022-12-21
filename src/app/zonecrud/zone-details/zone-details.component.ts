import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, Routes } from '@angular/router';
import { ZonecrudService } from '../zonecrud.service';
import { FormControl, FormGroup} from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-zone-details',
  templateUrl: './zone-details.component.html',
  styleUrls: ['./zone-details.component.css']
})
export class ZoneDetailsComponent implements OnInit {
  [y: string]: any;
  zoneId: any;
  zoneForm1!: FormGroup;
  imageInfos: any;

  constructor(private crudService: ZonecrudService,
              private activatedRoute: ActivatedRoute) {
                this.initializeForm();
               }
  
  initializeForm(){
    this.zoneForm1 = new FormGroup({
      zone_id:new FormControl(),
      zone_name:new FormControl(),
      zone_qrcode:new FormControl(),
    })
  }

  ngOnInit(): void {
    if(this.activatedRoute.snapshot.params['zoneID']){
      let zoneID =this.activatedRoute.snapshot.params['zoneID'];
      if(zoneID !== ''){
        this.loadZoneDetails(zoneID);
        
      }
    }
  }

  loadZoneDetails(zoneID:any){
      this.crudService.loadZoneInfo(zoneID).subscribe(res=>{
        this.zoneForm1.controls['zone_id'].setValue(res.zone_id);
        this.zoneForm1.controls['zone_name'].setValue(res.zone_name);
        this.zoneForm1.controls['zone_qrcode'].setValue(res.zone_qr);
        this.zoneId = res.zone_id;
        this.imageInfos = res.zone_qr;
      })

      // this.crudService.getFiles().subscribe(res=>{
      //   this.imageInfos = res.zone_qrcode;
      //   this.zoneId =res.zone_id;
      //   console.log(this.imageInfos);
      // });

  }

}
