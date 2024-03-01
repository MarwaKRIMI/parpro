import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';

import { User } from '../../models/user.model';
import { Professional } from '../../models/professional.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/users/` + id);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/register/complete`, user);
    }

    registerProfessional(professional: Professional) {
        return this.http.post(`${environment.apiUrl}/register-professional`, professional);
    }

    registerParticular(particular: User) {
        return this.http.post(`${environment.apiUrl}/register-particular`, particular);
    }

    me() {
        return this.http.get<any>(`${environment.apiUrl}/secure/me`);
    }

    update(user: any) {
        return this.http.put<any>(`${environment.apiUrl}/secure/me/profile`, user);
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/` + id);
    }
}
