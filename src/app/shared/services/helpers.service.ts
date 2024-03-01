import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Language } from '../../models/language.model';
import { Observable } from 'rxjs';
import { ResponseContentType } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class HelpersService {

  constructor(private http: HttpClient) { }

  getLanguages() {
    return this.http.get<Language[]>(`${environment.apiUrl}/i18ns`);
  }

  getImageBase64(imageUrl: string)  {
    return this.http.get<ResponseContentType.Blob>(imageUrl);
  }
}