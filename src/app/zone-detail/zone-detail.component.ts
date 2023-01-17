import { Component, OnInit } from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';
import { ZonehomeService } from '../zonehome.service';
import { ActivatedRoute} from '@angular/router';
import { NavbarService } from '../navbar.service';

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

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  
  panelOpenState: boolean = false;
  constructor(private crudService: ZonehomeService,private activatedRoute: ActivatedRoute,private confirmationService: ConfirmationService, private messageService: MessageService, private primengConfig: PrimeNGConfig, public nav: NavbarService) {
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
        },
        reject: () => {
          this.messageService.add({severity:'success', summary:'Rejected', detail:'You have rejected'});
      }
    });
}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.nav.show();
    this.nav.doSomethingElseUseful();
    
    if(this.activatedRoute.snapshot.params['zone_id']){
      if(this.activatedRoute.snapshot.params['site_name']){
        let zone_id =this.activatedRoute.snapshot.params['zone_id'];
        let site_name =this.activatedRoute.snapshot.params['site_name'];
        if(zone_id !== '' && site_name !== ''){
          this.loadZoneDetails(zone_id,site_name);
        }
      }
    }
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
      console.log(this.sitename);
    })
  }
}
