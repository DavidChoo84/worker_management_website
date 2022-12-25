import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {catchError, map} from "rxjs/operators";
import { HttpResponse } from './models/http-response';
import { Zone } from './models/zone';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZonecrudService {

  constructor(private httpClient: HttpClient) { }

  loadZones() {
    const url = environment.API_EndPoint + 'view.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  loadSites(){
    const url = environment.API_EndPoint + 'viewsite.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  // createZone(data:any): Observable<HttpResponse> {
  //   const url = environment.API_EndPoint + 'create.php';
  //   return this.httpClient.post<HttpResponse>(url, JSON.stringify(data)).pipe(map(data => data));
  // }
  createZone(
    zone_id: any,
    zone_name: any,
    site_id: any,
    profileImage: File
    ):Observable<any>{
      var formData: any = new FormData();
      formData.append("zone_id",zone_id);
      formData.append("zone_name",zone_name);
      formData.append("site_id",site_id);
      formData.append("fileToUpload", profileImage);
      const url = environment.API_EndPoint + 'create.php';
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

  loadZoneInfo(zoneID:any): Observable<Zone>{
    const url = environment.API_EndPoint + 'view_one.php?id=' + zoneID;
    return this.httpClient.get<Zone>(url).pipe(map(data => data));
  }

  updateProductDetails(
    zone_id: any,
    zone_name: any,
    site_id: any,
    profileImage: File): Observable<any>{
      var formData: any = new FormData();
      formData.append("zone_id",zone_id);
      formData.append("zone_name",zone_name);
      formData.append("site_id",site_id);
      formData.append("fileToUpload", profileImage);
      const url = environment.API_EndPoint + 'update.php';
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

  deleteProduct(zoneID:any,zone_qrcode:any): Observable<HttpResponse>{
    const url = environment.API_EndPoint + 'delete.php?id=' + zoneID+"&image="+zone_qrcode;
    return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);
    const url = environment.API_EndPoint;
    const req = new HttpRequest('POST', url+'create.php', formData, {
      reportProgress: true,
      responseType: 'json',
    }); 

    return this.httpClient.request(req);
  }

  // getFiles(): Observable<any> {
  //   const url = environment.API_EndPoint + 'uploads';
  //   return this.httpClient.get(url);
  // }

  
}
