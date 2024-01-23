import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';


export const routes: Routes = [
    {
        path:'cadastrar',
        component:RegisterComponent
      },
      {
        path:'login',
        component:LoginComponent
      },
      {
        path:'',
        component:HomeComponent
      }
];
