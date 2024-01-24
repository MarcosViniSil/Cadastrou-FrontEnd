import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  setToken(token: string) {
    let dataActual = new Date();
    let dataPlus = new Date(dataActual.getTime() + 2 * 60 * 60 * 1000);
    let expirationDate = new Date(dataPlus.getTime() - 3 * 60 * 60 * 1000);
    localStorage.setItem('JWT', token);
    localStorage.setItem('ExpirationDate', expirationDate.toDateString());


  }

  getToken(): string | null {
    return localStorage.getItem('JWT');
  }
  getDateExpiration(){
    return localStorage.getItem('ExpirationDate');
  }
  createAuthorizationHeader(): HttpHeaders | null {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      return null;
    }
  }
}
