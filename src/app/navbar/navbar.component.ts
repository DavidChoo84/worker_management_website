import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { ZonehomeService } from '../zonehome.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  adminType: Boolean = true;
  adminList: any = [];
  admin: any;
  constructor(public nav: NavbarService, private crudService: ZonehomeService ) { }

  ngOnInit(): void {
    //this.getAdmin();
  }
  // getAdmin(){
  //   this.adminList = this.crudService.loadAdmin().subscribe(res=>{
  //     this.admin = res;
  //     console.log(this.admin)
  //     // this.rowData = res;
  //   })
  // };
}
