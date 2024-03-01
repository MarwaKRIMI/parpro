import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';

@Injectable()
export class passwordService {
    constructor(private http: HttpClient) { }

    request_password(email){
        return this.http.post(`${environment.apiUrl}/request-password`, {email:email});
    }

    reset_password(token,password){
        return this.http.post(`${environment.apiUrl}/reset-password`, {token:token,password:password});
    }
}
