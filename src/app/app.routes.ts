import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
    {
        path:'cadastrar',
        component:RegisterComponent
      },
      {
        path:'',
        component:HomeComponent
      }
];
