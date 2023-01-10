import { Component, OnInit } from '@angular/core';
import { ZonehomeService } from '../zonehome.service';

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.css']
})
export class ZoneComponent implements OnInit {
  readonly time = new Date();
  date: string;
  result: string;
  siteNameList : any;
  sitename : any;
  checkinlist : any;
  checkinNo : any = [];

  constructor(private crudService: ZonehomeService) {
      this.date = this.time.toLocaleDateString();

      const [month, day, year] = this.date.split('/');

      this.result = [day, month, year].join('/');

   }

  ngOnInit(): void {
    this.getSiteName();
  }

  getSiteName(){
    this.checkinlist = this.crudService.loadCheckIn().subscribe(res=>{
      this.checkinNo = res;
      console.log(this.checkinNo);
      // this.rowData = res;
    })

  };

}
