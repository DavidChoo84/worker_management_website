import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import { HttpResponse } from './models/http.response';
import { Employee} from './models/employee';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeecrudService {

  constructor(private httpClient: HttpClient) { }
  loadEmployeeInfo(employeeID: any): Observable<Employee>{
    const url = environment.API_EndPoint + 'view_one.php?id='+employeeID;
    return this.httpClient.get<Employee>(url).pipe(map(data => data));
  }

  createEmployee(
    emp_id: any,
    emp_name: any,
    emp_gender: any,
    emp_photo: File,
    emp_passport: any,
    emp_arrival_dt: any,
    emp_contact_no: any,
    emp_call_no: any,
    emp_socsoNo: any,
    supervisor_id: any,
  ): Observable<any>{
    var formData: any = new FormData();
    formData.append("emp_id", emp_id);
    formData.append("emp_name", emp_name);
    formData.append("emp_gender", emp_gender);
    formData.append("fileToUpload", emp_photo);
    formData.append("emp_passport", emp_passport);
    formData.append("emp_arrival_dt", emp_arrival_dt);
    formData.append("emp_contact_no", emp_contact_no);
    formData.append("emp_call_no", emp_call_no);
    formData.append("emp_socsoNo", emp_socsoNo);
    formData.append("supervisor_id", supervisor_id);
    const url = environment.API_EndPoint + 'createemployee.php';
    return this.httpClient.post(url, formData,{
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    }).pipe(
      catchError((err: any) =>{
      alert(err.message);
      return throwError(() => err.message);
      })
    )
  }
  
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const url = environment.API_EndPoint;
    const req = new HttpRequest('POST', url+'createemployee.php', formData, {
      reportProgress: true,
      responseType: 'json',
    }); 

    return this.httpClient.request(req);
  }
  }
