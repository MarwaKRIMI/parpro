import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AddressService {
  constructor(private http: HttpClient) { }
  getAllCities() {
    return this.http.get<any[]>(`${environment.apiUrl}/address/cities`);
  }
}
