import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators,FormControl,ReactiveFormsModule,FormsModule,} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsComponent } from '../validation/forms/forms.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingComponent } from '../loading/loading.component';
import { truncate } from 'fs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,LoadingComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', './sign-up-responsive.component.css'],
})

export class SignUpComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private validateForm: FormsComponent,
    private router: Router
  ) {}

  userForm!: FormGroup
  showError: Boolean = false
  messageError: String = ''
  isRegisterAvailable:boolean=true
  
  ngOnInit() {
    this.initForm();
    this.subscribeToFormChanges();
    const emailUserExists = this.userService.getEmailUser()
    if(!(emailUserExists!=null && emailUserExists!="")){
      this.router.navigate(['login'])
    }
  }
  initForm() {
   
      let emailUser=this.userService.getEmailUser()
    
      if(emailUser!=null){
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required],
        email: [
          { value: emailUser, disabled: true },
          [Validators.required, Validators.email],
        ],
        password: ['', Validators.required],
      });
    
  }
    
  }
  registerUser() {
    if(this.isRegisterAvailable){
    this.userForm.get('email')?.enable();
    if (this.validateAllFields()) {
      this.isRegisterAvailable=false
      const result = this.userService.registerUser(this.userForm.value);

      result.subscribe({
       
        next: (res) => {
          if (res == null) {
            this.userService.removeEmailUser()
            this.isRegisterAvailable=true
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          this.isRegisterAvailable=true
          this.validateForm.onError(err.error.title);
        },
      });
    }
  }
  }

  private validateAllFields(): Boolean {
    if (
      this.userForm != undefined &&
      this.validateForm.validateName(this.userForm.value.name) &&
      this.validateForm.validatePassword(this.userForm.value.password)
    ) {

      return true;
    }
    this.initForm()
    return false;
  }
  subscribeToFormChanges() {
    this.validateForm.showError$.subscribe((showError) => {
      this.showError = showError;
    });
    this.validateForm.messageError$.subscribe((messageError) => {
      this.messageError = messageError;
    });
  }
  loginClick() {
    this.router.navigate(['login']);
  }
}
