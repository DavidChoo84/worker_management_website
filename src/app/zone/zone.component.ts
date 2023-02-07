import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
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

  constructor(private crudService: ZonehomeService, public nav: NavbarService) {
      this.date = this.time.toLocaleDateString();

      const [month, day, year] = this.date.split('/');

      this.result = [day, month, year].join('/');

   }

  ngOnInit(): void {
    this.getSiteName();
    this.nav.show();
    this.nav.doSomethingElseUseful();
  }

  getSiteName(){
    this.checkinlist = this.crudService.loadCheckIn().subscribe(res=>{
      this.checkinNo = res;
      console.log(this.checkinNo);
      // this.rowData = res;
    })

  };

}
