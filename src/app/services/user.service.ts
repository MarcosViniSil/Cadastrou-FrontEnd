import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { RegisterData } from '../models/registerData';
import { LoginData } from '../models/loginData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = api.urlUser;

  constructor(private http: HttpClient) {}

  registerUser(register: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl + 'Register', register);
  }

  loginUser(login: LoginData) {
    return this.http.post(this.apiUrl + 'Login', login);
  }
  getEmailUser(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('email');
    }
    return null;
  }
  setEmailUser(email:string){
    return localStorage.setItem('email',email)
  }
}
