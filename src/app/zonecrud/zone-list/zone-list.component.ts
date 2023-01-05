import { Component, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ZonecrudService } from '../zonecrud.service';

@Component({
  selector: 'app-zone-list',
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.css']
})
 
export class ZoneListComponent implements OnInit {
  
  headers = ['Zone ID','Zone Name','Zone Qr Code','Action'];
  zoneList: any = [];
  zoneListSubscribe: any;
  params?: any;
  constructor(private crudService: ZonecrudService) { 
    
  }
  
  ngOnInit(): void {
    this.getZoneList();
  }

  getZoneList(){
    this.zoneListSubscribe = this.crudService.loadZones().subscribe(res=>{
      this.zoneList = res;
      // this.rowData = res;
    })
  };

  deleteProduct(params:any,zone_qrcode:any){
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
        console.log(params,zone_qrcode);
        this.crudService.deleteProduct(params,zone_qrcode).subscribe(res =>{
          console.log("remove");
          if(res.result === 'success'){
            this.getZoneList();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success');
          }
        });
      }
    });

    
  }
}




