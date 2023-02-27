import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Site } from './models/site';
import { EmployeeReport } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl: string = environment.API_EndPoint;

  constructor(
    private httpClient: HttpClient
    ) { }

    retrieveEmployeeReportDetails(id: any){
      return this.httpClient.get(this.baseUrl + 'employeeReportDetails.php?id=' + id);
    }

    retrieveEmployeeDetails(){
      return this.httpClient.get(this.baseUrl + 'employeeDetails.php');
    }

    retrieveWorkingTime(id: any, startDate: any, endDate: any){
      return this.httpClient.get(this.baseUrl + 'clockInOut.php?id=' + id + '&startDate=' + startDate + '&endDate=' + endDate);
    }

    retrieveAssignID(employeeID: any){
      return this.httpClient.get(this.baseUrl + 'retrieveEmployeeID.php?employeeID=' + employeeID);
    }
    
}
