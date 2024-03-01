import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';
import { Professional } from '../../models/professional.model';
import { FilterDemand } from '../../models/demand-filter.model';
import { Demand } from '../../models/demand.model';


@Injectable()
export class ProfessionalService {
    constructor(private http: HttpClient) { }

    getProfessional(slug: string) {
      return this.http.get<Professional>(`${environment.apiUrl}/professional/${slug}`);
    }

    getSecureProfessional(slug: string) {
      return this.http.get<Professional>(`${environment.apiUrl}/secure/professional/${slug}`);
    }

    search(filter : any) {
        return this.http.post<Professional[]>(`${environment.apiUrl}/search/professional`, filter);
    }

    demands(filter : FilterDemand) {
        return this.http.get<Demand[]>(`${environment.apiUrl}/secure/demands`,{ params: JSON.parse(JSON.stringify(filter)) });
    }

    update(professional: Professional, id: number) {
        return this.http.patch<Professional>(`${environment.apiUrl}/secure/professionals/${id}`, professional);
    }

    postFile( fileToUpload: File) {
        const endpoint = '';
        const formData: FormData = new FormData();
        formData.append('Image', fileToUpload);
        return this.http
          .post(endpoint, formData);
      }

      addImage(image : string, proId: string) {
        return this.http.post<Professional>(`${environment.apiUrl}/secure/realizations/${proId}/image`, {image: image});
      }

      deleteImage(imageId: string, proId: string) {
        return this.http.delete<Professional>(`${environment.apiUrl}/secure/realizations/${proId}/image/${imageId}`);
      }

      postPayment(id: string, amount: number) {
        return this.http.post<Professional>(`${environment.apiUrl}/secure/payments`, {id: id, amount: amount});
      }
}
