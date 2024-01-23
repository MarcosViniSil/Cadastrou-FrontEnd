import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import  {RegisterData} from '../models/registerData'


@Injectable({
    providedIn: 'root'
  })

  export class UserService {
    private apiUrl = environment.register;
  
    constructor(private http: HttpClient) {}
  
    registerUser(user: RegisterData): Observable<any> {
      return this.http.post(this.apiUrl, user);
    }
  }