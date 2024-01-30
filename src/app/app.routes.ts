import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ValidationEmailComponent } from './components/validation/validation-email/validation-email.component';
import { EmailComponent } from './pages/email/email.component';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { SignUpADMComponent } from './pages/sign-up-adm/sign-up-adm.component';
import { RegisterCardComponent } from './pages/register-card/register-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ChooseActionComponent } from './components/choose-action/choose-action.component';
import { InitialComponent } from './pages/initial/initial.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'cadastrar', component: RegisterComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'email', component: EmailComponent, pathMatch: 'full' },
  { path: 'cadastrar/adm',component:SignUpADMComponent,pathMatch: 'full'},
  { path: 'cadastrar/card',component:RegisterCardComponent,pathMatch: 'full'},
  { path: 'inicial',component:InitialComponent,pathMatch: 'full'},
  { path: '**',component:NotFound404Component,pathMatch: 'full'}
  
      

];
