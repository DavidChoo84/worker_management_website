import { Component, OnInit } from '@angular/core';
import { ZonehomeService } from '../zonehome.service';
import { NavbarService } from '../navbar.service';
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
  searchfilter !: string;

  constructor(private crudService: ZonehomeService, public nav: NavbarService) {
      this.date = this.time.toLocaleDateString();

      const [month, day, year] = this.date.split('/');

      this.result = [day, month, year].join('/');

   }

  ngOnInit(): void {
    this.nav.show();
    this.nav.doSomethingElseUseful();
    this.getSiteName();
  }

  getSiteName(){
    this.checkinlist = this.crudService.loadCheckIn().subscribe(res=>{
      this.checkinNo = res;
      console.log(this.checkinNo);
      // this.rowData = res;
    })

  };

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.sitename.filter = filterValue;
  }

}
