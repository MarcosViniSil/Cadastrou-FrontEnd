import { Component, OnInit } from '@angular/core';
import { ValidationEmailComponent } from '../validation/validation-email/validation-email.component';
import { MenuLoggedComponent } from '../menu-logged/menu-logged.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoadingComponent } from '../loading/loading.component';
import { UserService } from '../../services/user.service';
import { updatePassword } from '../../models/updatePasswordData';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [
    ValidationEmailComponent,
    MenuLoggedComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css',
})
export class UpdatePasswordComponent implements OnInit {
  isAvaibaleUpdate: boolean = false;
  passwordForm!: FormGroup;
  isUpdatePasswordAvailable: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tokenService:TokenService
  ) {}

  handleUpdate(value: boolean) {
    this.isAvaibaleUpdate = value;
  }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.passwordForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  updatePassword() {
    if(this.isUpdatePasswordAvailable){
    if (this.validatePassword()) {
      console.log("ssss")
      this.isUpdatePasswordAvailable=false
      const pasword: updatePassword = {
        password: this.passwordForm.value.password,
      };

      const response = this.userService.updatePassword(pasword);
      if (response != null) {
        response.subscribe({
          next: (res) => {
            console.log(res)
            this.isUpdatePasswordAvailable=true
            if (res == null) {
              this.tokenService.removeTokenUser()
              this.tokenService.removeDataExpiration()
              this.router.navigate(['login']);
            }
          },
          error: (err) => {
            this.isUpdatePasswordAvailable=true
             console.log(err)
          },
        });
      }
    }else{
      alert("As senhas devem ser iguais e deve ser maior que 8 e menor que 20")
    }
  }
  }

  validatePassword():boolean{
    console.log(this.passwordForm.value.password)
    console.log(this.passwordForm.value.confirmPassword)
    if(this.passwordForm.value.password.length>=8  && this.passwordForm.value.password.length<=20 ){
     if(this.passwordForm.value.password == this.passwordForm.value.confirmPassword){
      
         return true
      }
      
  }
  return false
}
}
