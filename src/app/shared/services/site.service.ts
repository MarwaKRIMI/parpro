import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';
import { Site } from '../../models/site.model';
@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private http: HttpClient) { }
  post(site: Site){

    site.address.address =  site.address.city
    return this.http.post(`${environment.apiUrl}/siteweb`, site);
}
}
