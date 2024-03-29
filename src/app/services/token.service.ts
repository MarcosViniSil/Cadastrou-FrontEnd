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
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('JWT');
    }
    return null
  }
  getDateExpiration():string | null {
    if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('ExpirationDate');
    }
    return null
  }
  createAuthorizationHeader(): HttpHeaders | null {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + token);
    } else {
      return null;
    }
  }
  removeTokenUser(){
    if (typeof localStorage !== 'undefined') {
       localStorage.removeItem('JWT')
    }
  }
  removeDataExpiration(){
    if (typeof localStorage !== 'undefined') {
       localStorage.removeItem('ExpirationDate')
    }
  }
}
