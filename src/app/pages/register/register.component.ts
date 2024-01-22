import { Component } from '@angular/core';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { FormBuilder, FormGroup, Validators,FormsModule,ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MenuBarComponent,SignUpComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
