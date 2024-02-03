import { Component } from '@angular/core';
import { ValidationEmailComponent } from '../validation/validation-email/validation-email.component';
import { MenuLoggedComponent } from '../menu-logged/menu-logged.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [ValidationEmailComponent,MenuLoggedComponent,CommonModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {
   isAvaibaleUpdate:boolean=false

   handleUpdate(value: boolean) {
    this.isAvaibaleUpdate=value
  }

}
