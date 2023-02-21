import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { ApiService } from '../api.service';
import { map } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  adminList: any = {};
  constructor(public nav: NavbarService, public api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (this.api.isLoggedIn()) {
      this.getAdmin();
    }
    this.api.updateAdminList.subscribe(res => { // subscribe to event to update adminList array
      this.getAdmin();
    });
  }

  isLoggedOut() {
    this.api.deleteUserData();
    this.router.navigate(['/login']).then(() => {
      this.adminList = [];
      this.api.updateAdminList.emit(true); // emit event to update adminList array
    });
  }
  
  getAdmin() {
    this.adminList = [this.api.getUserData()];
    console.log(this.adminList);
  }  
}
