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

  constructor(
    private formBuilder: FormBuilder,
    private userService: RegisterUserService
  ) {}

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
    if (this.validateAllFields()) {
      const result = this.userService.registerUser(this.userForm.value);

      result.subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          this.onError(err.error.title);
        },
      });
    }
  }

  private validateAllFields(): Boolean {
    if (
      this.userForm != undefined &&
      this.validateName(this.userForm.value.name) &&
      this.validateEmail(this.userForm.value.email) &&
      this.validatePassword(this.userForm.value.password)
    ) {
      return true;
    }

    return false;
  }
  private validateName(name: string): Boolean {
    if (name.length > 2) {
      return true;
    } else {
      this.onError('Nome inválido');
      return false;
    }
  }
  private validatePassword(password: string): Boolean {
    if (password.length >= 8 && password.length <= 20) {
      return true;
    } else {
      this.onError('A senha deve conter no mínimo 8 e no máximo 20 carateres');
      return false;
    }
  }
  private validateEmail(email: string): Boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return true;
    } else {
      this.onError('Formato de email inválido');
      return false;
    }
  }

  private onError(message: string) {
    this.showError = true;
    this.messageError = message;
    setTimeout(() => {
      this.showError = false;
      this.messageError = '';
    }, 5000);
  }
}
