import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';
import { Activity } from '../../models/activity.model';

@Injectable()
export class ActivityService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Activity[]>(`${environment.apiUrl}/activities`);
    }
    getID(id: string){
        return this.http.get<Activity>(`${environment.apiUrl}/activities/${id}`)
    }
}