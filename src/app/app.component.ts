import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HomeComponent,SignUpComponent,RouterLink,RouterLinkActive,RegisterComponent,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'registered';
}
