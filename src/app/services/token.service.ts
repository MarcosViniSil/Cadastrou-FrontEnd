import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {

  setToken(token: string) {
    localStorage.setItem('JWT', token);
    
  }

  setDateExpiration() {
    let dataActual = new Date();

    dataActual.setHours(dataActual.getHours() + 24);

    let hours = String(dataActual.getHours()).padStart(2, '0');
    let minutes = String(dataActual.getMinutes()).padStart(2, '0');
    let day = String(dataActual.getDate()).padStart(2, '0');
    let month = String(dataActual.getMonth() + 1).padStart(2, '0'); 
    let year = dataActual.getFullYear();

    let dateFormated = `${hours}:${minutes} ${day}/${month}/${year}`;
    localStorage.setItem('ExpirationDate', dateFormated);
  }

  getToken(): string | null {
    return localStorage.getItem('JWT');
  }
  getDateExpiration() {
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
