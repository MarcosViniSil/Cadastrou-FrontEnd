import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { FormsComponent } from '../../components/validation/forms/forms.component';
import { CardService } from '../../services/card.service';
import { addCardData } from '../../models/addCardData';
@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [
    MenuLoggedComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.css',
})
export class RegisterCardComponent implements OnInit {
  constructor(
    private cardService: CardService,
    private formBuilder: FormBuilder,
    private session: SessionService,
    private router: Router,
    private validateForm: FormsComponent
  ) {}
  userForm!: FormGroup;
  isRegisterAvailable: boolean = true;
  showError: Boolean = false;
  messageError: String = '';

  ngOnInit(): void {
    this.subscribeToFormChanges();
    this.initForm();
    const isAuthenticated = this.session.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      limitDate: ['', Validators.required],
      frequency: ['', Validators.required],
    });
  }

  private validateFields(): boolean {
    if (
      this.validateForm.validateName(this.userForm.value.name) &&
      this.validateForm.validateDescription(this.userForm.value.description) &&
      this.validateForm.validateFrequency(this.userForm.value.frequency) &&
      this.validateForm.validateDate(this.userForm.value.limitDate)
    ) {
      return true;
    } else {
      return false;
    }
  }

  addCard() {
    if (this.validateFields()) {
      if (this.isRegisterAvailable) {
        this.isRegisterAvailable=false
        const data: addCardData = {
          name: this.userForm.value.name,
          description: this.userForm.value.description,
          dateFinish: new Date(this.userForm.value.limitDate),
          frequency: this.userForm.value.frequency,
        };

        const result = this.cardService.addCard(data);
        if (result != null) {
          result.subscribe({
            next: (res) => {
              if (res == null) {
                this.isRegisterAvailable = true;
                this.router.navigate(['inicial']);
              }
            },
            error: (err) => {
              if(err.status!=0){
                this.validateForm.onError(err.error.title);
                }else{
                  this.validateForm.onError("Ocorreu um erro, tente novamente")
                }
              this.isRegisterAvailable = true;
            },
          });
        }
      }
    }

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
