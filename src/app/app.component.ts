import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { FormsComponent } from './components/validation/forms/forms.component';
import { ValidationEmailComponent } from './components/validation/validation-email/validation-email.component';
import { EmailComponent } from './pages/email/email.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { SignUpADMComponent } from './pages/sign-up-adm/sign-up-adm.component';
import { RegisterCardComponent } from './pages/register-card/register-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChooseActionComponent } from './components/choose-action/choose-action.component';
import { MenuLoggedComponent } from './components/menu-logged/menu-logged.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HomeComponent,
    SignUpComponent,
    RouterLink,
    RouterLinkActive,
    RegisterComponent,
    HttpClientModule,
    LoginComponent,
    ValidationEmailComponent,
    EmailComponent,
    NotFound404Component,
    SignUpADMComponent,
    RegisterCardComponent,
    LoadingComponent,
    ChooseActionComponent,
    MenuLoggedComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'registered';
}
