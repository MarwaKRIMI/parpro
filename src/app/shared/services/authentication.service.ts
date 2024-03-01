import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable()
export class AuthenticationService {

  public token: string;
  constructor(private http: HttpClient) {}


  public logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/authenticate`, { email: email, password: password })
        .pipe(
          map(
            user => {
              if (user.accessToken) {
                // set token property
                this.token = user.accessToken;
                localStorage.setItem('token', user.accessToken);
                localStorage.setItem('currentUser', JSON.stringify(user));
                return user.Role;
              }
              else {
                // return false to indicate failed login
                return false
              }
            },
            err => {
              return false;
            }
          ));
  }

  getCurrentUser(): any {
    return localStorage.getItem('currentUser');
  }

  getUserToken(): any {
    return localStorage.getItem('token');
  }

  isLoggedIn(): any {
    if(localStorage.getItem('token') != null) {
        return true;
    }else{
        return false;
    }
  }

  checkCredentials() {
    if (sessionStorage.getItem('user') === null) {
      return false;
    }

    return true;
  }
  getCurrentUserName(){
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return user.firstName + ' ' + user.lastName;
    }else{
      return false;
    }
  }

  getUserRole(){
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return user.Role;
    }else{
      return false;
    }
  }

  GetUserId(): any {
    if(localStorage.getItem('currentUser')){
      let user = JSON.parse(localStorage.getItem('currentUser'));
      return user.id;
    }else{
      return false;
    }
  }
}
