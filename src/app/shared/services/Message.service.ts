import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from './../../../environments/environment';

import { Message } from '../../models/message.model';

@Injectable()
export class MessageService {
    constructor(private http: HttpClient) { }

    post(message: Message){
        return this.http.post(`${environment.apiUrl}/messages`, message);
    }
}
