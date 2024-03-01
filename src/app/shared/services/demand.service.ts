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
export class DemandService {
  editDemande(demand: Demand) {
    return this.http.put(`${environment.apiUrl}/secure/demands/${demand.id}`,{ params: JSON.parse(JSON.stringify(demand)) });
  }
  getDemand(id: string) {
    return this.http.get<Demand>(`${environment.apiUrl}/secure/demand/${id}`);
  }

  constructor(private http: HttpClient) { }

  createDemande(demande : Demand) {
    return this.http.post(`${environment.apiUrl}/secure/demands`, demande);
  }

  createFirstDemande(demande : ParticularFirstRequest) {
    return this.http.post(`${environment.apiUrl}/register-first-demand-particular`, demande);
  }


  getDemands(filter : FilterDemand) {
    if(filter) {
      return this.http.get<Demand[]>(`${environment.apiUrl}/secure/me/demands`,{ params: JSON.parse(JSON.stringify(filter)) });
    }
    return this.http.get<Demand[]>(`${environment.apiUrl}/secure/me/demands`)
  }

  getListDemands(filter : FilterDemand) {
    if(filter) {
      return this.http.get<Demand[]>(`${environment.apiUrl}/secure/demands`,{ params: JSON.parse(JSON.stringify(filter)) });
    }
    return this.http.get<Demand[]>(`${environment.apiUrl}/secure/demands`)
  }

  deleteDemands(id: string) {
    return this.http.delete(`${environment.apiUrl}/secure/demands/${id}`);
  }

  addImage(image : string, demandId: string) {
    return this.http.post<Demand>(`${environment.apiUrl}/secure/demands/${demandId}/image`, image);
  }
  deleteImage(imageId: string, demandId: string) {
    return this.http.delete(`${environment.apiUrl}/secure/demands/${demandId}/image/${imageId}`);
  }
  acceptDemand(demandId: string, professionalId: string) {
    return this.http.post(`${environment.apiUrl}/secure/demands/participates`, {demand: demandId, professional: professionalId});
  }
}
