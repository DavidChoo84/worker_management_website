import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Users } from './users';

@Injectable({
providedIn: 'root'
})

export class ApiService {
    redirectUrl: string;
    baseUrl:string = "http://localhost/web_apinew";
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
    @Output() updateAdminList: EventEmitter<any> = new EventEmitter();

    constructor(private httpClient : HttpClient) { }
    public userlogin(username: any, password: any) {
        alert(username)
        alert(password)
        return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
            .pipe(map(Users => {
                this.setToken(Users[0].name);
                this.setUserData(Users[0]);
                this.getLoggedInName.emit(true);
                this.updateAdminList.emit(true);
                return Users;
            }));
        }


//token

    setUserData(userData: any) {
        localStorage.setItem('userdata', JSON.stringify(userData));
        console.log(userData);
    }

    getUserData() {
        const userData = localStorage.getItem('userdata');
        return JSON.parse(userData ||'{}');
        
    }

    deleteUserData(){
        const userData = localStorage.removeItem('userdata');
        console.log(userData);
    }

    setToken(token: any) {
        localStorage.setItem('token', token);
    }

    getToken() {
        return localStorage.getItem('token');
        
    }

    deleteToken() {
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        const usertoken = this.getToken();
        if (usertoken != null) {
            return true
        }
        return false;
    }
}