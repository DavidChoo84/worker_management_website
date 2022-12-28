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

  loadSites(){
    const url = environment.API_EndPoint + 'homeview.php';
    return this.httpClient.get(url).pipe(map(data => data));
  }
}
