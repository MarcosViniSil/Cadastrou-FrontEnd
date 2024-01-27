import { Component, OnInit } from '@angular/core';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { FormsComponent } from '../../components/validation/forms/forms.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdmService } from '../../services/adm.service';
@Component({
  selector: 'app-sign-up-adm',
  standalone: true,
  imports: [MenuBarComponent, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-up-adm.component.html',
  styleUrls: ['./sign-up-adm.component.css', './sign-up-adm-responsive.css'],
})
export class SignUpADMComponent implements OnInit {
  userForm!: FormGroup;
  showError: Boolean = false;
  messageError: String = '';

  constructor(
    private formBuilder: FormBuilder,
    private validateForm: FormsComponent,
    private router: Router,
    private admService: AdmService
  ) {}
  ngOnInit() {
    this.initForm();
    this.subscribeToFormChanges();
  }
  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      hash: ['', Validators.required],
      passwordAdm: ['', Validators.required],
    });
  }

  registerAdm() {
    if (this.validateFields()) {
      const result = this.admService.registerAdm(this.userForm.value);

      result.subscribe({
        next: (res) => {
          if (res == null) {
            this.router.navigate(['login']);
          }
        },
        error: (err) => {
          this.validateForm.onError(err.error.title);
        },
      });
    }
  }
  private validateFields(): Boolean {
    if (
      this.userForm != undefined &&
      this.validateForm.validateName(this.userForm.value.name) &&
      this.validateForm.validateEmail(this.userForm.value.email) &&
      this.validateForm.validatePassword(this.userForm.value.password)
    ) {
      return true;
    }
    this.initForm();
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
