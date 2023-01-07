import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ZonehomeService {

  constructor(private httpClient: HttpClient) { }

  loadCheckIn(){
    const url = environment.API_EndPoint + 'checkinview.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  loadSiteInfo(zoneID:any, site_name:any): Observable<Zone>{
    const url = environment.API_EndPoint + 'loadeachsite.php?zone_id=' + zoneID+ '&site_name='+ site_name;
    return this.httpClient.get<Zone>(url).pipe(map(data => data));
  }
}
