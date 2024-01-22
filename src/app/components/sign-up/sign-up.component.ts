import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { RegisterUserService } from '../../services/registerUser.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css', './sign-up-responsive.component.css'],
})
export class SignUpComponent implements OnInit {
  userForm!: FormGroup;
  showError: Boolean = false;
  messageError: string = '';
  //private userService: RegisterUserService
  constructor(private formBuilder: FormBuilder,private userService: RegisterUserService) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  registerUser() {
    if (this.userForm != undefined) {
      if (this.validateName(this.userForm.value.name)) {
        if (this.validateEmail(this.userForm.value.email)) {
          if (this.validatePassword(this.userForm.value.password)) {
            console.log(this.userForm.value);
              const result = this.userService.registrarUsuario(this.userForm.value)
              console.log(result)
              result.subscribe(
                {
                  next: (res) => {
                      console.log(res)
                  },
                  error: (err) => console.log(err)
                }
               
 
               );
          } else {
            this.onError('A senha deve conter no minimo 8 e no máximo 20 carateres')
          }
        } else {
          this.onError('Formato de email invalido')
        }
      } else {
        this.onError('Nome invalido')
      }
    }
  }
  private validateName(name: string): Boolean {
    if (name.length > 2) {
      return true;
    } else {
      return false;
    }
  }
  private validatePassword(password: string): Boolean {
    if (password.length >= 8 && password.length <= 20) {
      return true;
    } else {
      return false;
    }
  }
  private validateEmail(email: string): Boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  onError(message: string) {
    this.showError = true;
    this.messageError = message;
    setTimeout(() => {
      this.showError = false;
      this.messageError = '';
    }, 2000);
  }
}
