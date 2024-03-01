import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDemandService {

  constructor(private http: HttpClient) { }

  confirmDemand(demandId) {
    return this.http.post(`${environment.apiUrl}/secure/demand/${demandId}/accept`, {});
  }
}
