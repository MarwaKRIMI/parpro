import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Demand } from '../../models/demand.model';
import { FilterDemand } from '../../models/demand-filter.model';
import { Image } from '../../models/image.model';
import { ParticularFirstRequest } from '../../models/particularFirstRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ConfirmEmailService {

  constructor(private http: HttpClient) { }

  confirm(user : string, token: string) {
    return this.http.post<Demand>(`${environment.apiUrl}/confirm-email`, {id: user, token: token});
  }
}
