import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { TokenService } from './token.service';
import { addCardData } from '../models/addCardData';

@Injectable({
    providedIn: 'root',
  })
  export class CardService {

    constructor(private http: HttpClient,private tokenService:TokenService) {}
    private apiUrl = api.urlCard;

    addCard(register: addCardData): Observable<any>|null {
        const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
        if(header!=null){
            return this.http.post(this.apiUrl + 'Register', register,{headers:header});
        }else{
            return null
        }
        
      }

  }