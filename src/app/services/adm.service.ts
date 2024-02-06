import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { RegisterAdmData } from '../models/registerAdmData';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root',
  })
  export class AdmService {
    private apiUrl = api.urlAdm;
    private apiUrlUser = api.urlUser;
    constructor(private http: HttpClient,private tokenService:TokenService) {}

    registerAdm(data:RegisterAdmData):Observable<any>{
      return this.http.post(this.apiUrl,data)
    }

    getUsers(offset:number):Observable<any>|null{
      const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
      if(header!=null){
        return this.http.get(this.apiUrlUser+"List/"+offset,{headers:header})
      }else{
        return null
      }
    }
    getUsersToDelete(offset:number):Observable<any>|null{
      const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
      if(header!=null){
        return this.http.get(this.apiUrlUser+"List/Delete/"+offset,{headers:header})
      }else{
        return null
      }
    }

    deleteUserById(id:number):Observable<any>|null{
      const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
      if(header!=null){
        return this.http.delete(this.apiUrlUser+"Delete/"+id,{headers:header})
      }else{
        return null
      }
         
    }
  }