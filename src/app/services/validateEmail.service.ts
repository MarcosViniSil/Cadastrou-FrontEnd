import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { codesData } from '../models/validateCodesData';

@Injectable({
  providedIn: 'root',
})
export class ValidateEmailService {
    private apiUrl = api.urlValidateEmail;

    constructor(private http: HttpClient) {}

    sendCodeEmail(email:string):Observable<any>{
        return this.http.get(this.apiUrl+"Email/"+email)
    }
    validateCodeEmail(codes:codesData):Observable<any>{
         return this.http.post(this.apiUrl+"Code",codes)
    }
    removeCodeEmail(){
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('Code')
        }
    }
    getCodeEmail(){
      if (typeof localStorage !== 'undefined') {
        return localStorage.getItem('Code');
      }
      return null;
    }
    setCodeEmail(code:string){
      return localStorage.setItem('Code',code)
    }

}
