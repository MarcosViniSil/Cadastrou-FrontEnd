import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsComponent } from '../validation/forms/forms.component';
import { Router } from '@angular/router';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule,RouterOutlet,RouterLink,RouterLinkActive],
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
  userForm!: FormGroup;
  showError:Boolean=false
  messageError:String=""
  
  ngOnInit() {
    this.initForm();
    this.subscribeToFormChanges();
  }
  initForm() {
    const valorPadrao = localStorage.getItem('email') || ''
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [{ value: valorPadrao, disabled: true }, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  registerUser() {
    this.userForm.get('email')?.enable();
    if (this.validateAllFields()) {
      console.log(this.userForm.value.email)
      const result = this.userService.registerUser(this.userForm.value);

      result.subscribe({
        next: (res) => {
          console.log(res);
          if(res==null){
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          this.validateForm.onError(err.error.title);
        },
      });
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
  loginClick(){
    this.router.navigate(['login']);
  }
}
