import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { IAppConfig } from './models/app-config.model';

@Injectable()
export class AppConfig {

    static settings: IAppConfig;

    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `assets/config/config.${environment}.json`;
        return   this.http.get<IAppConfig>(jsonFile);
    }
}
