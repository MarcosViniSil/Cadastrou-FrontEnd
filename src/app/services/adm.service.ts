import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { RegisterAdmData } from '../models/registerAdmData';


@Injectable({
    providedIn: 'root',
  })
  export class AdmService {
    private apiUrl = api.urlAdm;

    constructor(private http: HttpClient) {}

    registerAdm(data:RegisterAdmData):Observable<any>{
      return this.http.post(this.apiUrl,data)
    }
  }