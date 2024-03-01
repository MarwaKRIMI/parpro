import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class EmailService {
  constructor(private http: HttpClient) {}
  request_email(email) {
    return this.http.post(`${environment.apiUrl}/register/resend-email`, {
      email: email
    });
  }
}
