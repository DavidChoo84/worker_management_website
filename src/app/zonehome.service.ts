import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { Site } from './models/site';


@Injectable({
  providedIn: 'root'
})
export class ZonehomeService {

  constructor(private httpClient: HttpClient) { }

  loadCheckIn(){
    const url = environment.API_EndPoint + 'checkinview.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  loadSiteInfo(zone_id:any, site_name:any): Observable<Site>{
    const url = environment.API_EndPoint + 'loadeachsite.php?zone_id=' + zone_id+ '&site_name='+ site_name;
    return this.httpClient.get<Site>(url).pipe(map(data => data));
  }

  assignEmp(
    empid: any,
    time: any,
    zoneID : any
    ):Observable<any>{
      var formData: any = new FormData();
      formData.append("empid",empid);
      formData.append("time",time);
      formData.append("zoneid",zoneID);
      const url = environment.API_EndPoint + 'assignEmp.php?zone_id=' + zoneID;
      return this.httpClient.post(url, formData,{
        reportProgress: true,
        observe: 'events',
        responseType: 'text'
      }).pipe(
        catchError((err: any) => {
          alert(err.message);
          return throwError(() => err.message);
        })
      )
  }

}
