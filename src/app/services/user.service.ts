import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api } from '../environments/environment';
import { RegisterData } from '../models/registerData';
import { LoginData } from '../models/loginData';
import { TokenService} from './token.service'
import { updatePassword } from '../models/updatePasswordData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = api.urlUser;

  constructor(private http: HttpClient,private tokenService:TokenService) {}

  registerUser(register: RegisterData): Observable<any> {
    return this.http.post(this.apiUrl + 'Register', register);
  }

  loginUser(login: LoginData) {
    return this.http.post(this.apiUrl + 'Login', login);
  }
  profileUser(): Observable<any>|null {
    const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
    if(header!=null){
          return this.http.get(this.apiUrl+"profile",{headers:header});  
    }else{
      return null
    }
  }
  requestDeleteAccount():Observable<any>|null{
    const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
    if(header!=null){
      return this.http.get(this.apiUrl+"Request/Delete",{headers:header})
    }else{
      return null
    }
  }
  updatePassword(password:updatePassword):Observable<any>|null{
    const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
    if(header!=null){
      return this.http.post(this.apiUrl+"Update/Password",password,{headers:header})
    }else{
      return null
    }
  }

  getRoleUser():Observable<any>|null{
    const header:HttpHeaders | null = this.tokenService.createAuthorizationHeader()
    if(header!=null){
      return this.http.get(this.apiUrl+"role",{headers:header})
    }else{
      return null
    }
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
  removeEmailUser(){
    if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('email')
    }
  }

}
