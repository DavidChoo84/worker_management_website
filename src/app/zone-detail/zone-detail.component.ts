import { Component, OnInit } from '@angular/core';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-zone-detail',
  templateUrl: './zone-detail.component.html',
  styleUrls: ['./zone-detail.component.css'],
  providers: [ConfirmationService,MessageService]
})
export class ZoneDetailComponent implements OnInit {

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'hahaha';
  
  panelOpenState: boolean = false;
  constructor(private confirmationService: ConfirmationService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {}

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
  }
  displayBasic: boolean;

  showBasicDialog() {
    this.displayBasic = true;
}
}
