import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavbarService } from '../navbar.service';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
angForm: FormGroup;
constructor(private fb: FormBuilder,private dataService: ApiService,private router:Router, public nav: NavbarService) {
this.angForm = this.fb.group({
username: ['', [Validators.required,Validators.minLength(1)]],
password: ['', Validators.required]
});
}

ngOnInit() {
    this.nav.hide();
    this.nav.doSomethingElseUseful();
}
postdata(angForm1: { value: { username: any; password: any; }; })
{
this.dataService.userlogin(angForm1.value.username,angForm1.value.password)
.pipe(first())
.subscribe(
data => {
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/zone';
this.router.navigate([redirect]);
console.log(redirect);
},
error => {
console.log(this.dataService.redirectUrl);
alert("Username or password is incorrect")
});
}
get username() { return this.angForm.get('username'); }
get password() { return this.angForm.get('password'); }
}