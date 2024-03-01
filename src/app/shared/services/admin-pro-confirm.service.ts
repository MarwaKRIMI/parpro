import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmProService {

  constructor(private http: HttpClient) { }

  confirmPro(proId) {
    return this.http.post(`${environment.apiUrl}/secure/professionals/${proId}/validate`, {});
  }
}
