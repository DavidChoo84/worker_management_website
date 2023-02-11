import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { ApiService } from '../api.service';
import { map } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminList: any = [];
  constructor(public nav: NavbarService, public api: ApiService) { }

  ngOnInit(): void {
    this.getAdmin();
  }
  getAdmin(){
    this.adminList = [this.api.getUserData()];
    console.log(this.adminList);
  }
}
