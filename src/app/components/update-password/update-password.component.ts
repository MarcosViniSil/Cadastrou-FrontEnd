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
    private router: Router
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
      this.isUpdatePasswordAvailable=false
      const pasword: updatePassword = {
        password: this.passwordForm.value.password,
      };

      const response = this.userService.updatePassword(pasword);
      if (response != null) {
        response.subscribe({
          next: (res) => {
            this.isUpdatePasswordAvailable=true
            if (res == null) {
              this.router.navigate(['login']);
            }
          },
          error: (err) => {
            this.isUpdatePasswordAvailable=true
             console.log(err)
          },
        });
      }
    }
  }
  }

  validatePassword():boolean{
    if(this.passwordForm.value.password === this.passwordForm.value.confirmPassword){
      if(this.passwordForm.value.password>=8 && this.passwordForm.value.confirmPassword>=8 && this.passwordForm.value.password<=20 && this.passwordForm.value.confirmPassword<=20 ){
         return true
      }
      
  }
  return false
}
}
