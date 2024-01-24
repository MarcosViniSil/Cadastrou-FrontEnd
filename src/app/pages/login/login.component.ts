import { Component } from '@angular/core';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { FormsComponent } from '../../components/validation/forms/forms.component';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MenuBarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './login-responsive.component.css'],
})
export class LoginComponent {
  userForm!: FormGroup;
  showError: Boolean = false;
  messageError: String = '';
  constructor(
    private formBuilder: FormBuilder,
    private validateForm: FormsComponent,
    private userService: UserService,
    private tokenService:TokenService
  ) {}
  ngOnInit() {
    this.initForm();
    this.subscribeToFormChanges();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  loginUser() {
    if (this.validateAllFields()) {
      const result = this.userService.loginUser(this.userForm.value);

      result.subscribe({
        next: (res:any) => {
          const token = res.token
          this.tokenService.setToken(token)
          //TODO redirecionar para a pagina de cadastros
        },
        error: (err) => {
          this.validateForm.onError(err.error.title);
        },
      });
    } 
  }
//testeLoginAngular@gmail.com
  private validateAllFields(): Boolean {
    if (
      this.userForm != undefined &&
      this.validateForm.validateEmail(this.userForm.value.email) &&
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
}
