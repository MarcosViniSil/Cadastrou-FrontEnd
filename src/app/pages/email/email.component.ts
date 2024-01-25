import { Component } from '@angular/core';
import { ValidationEmailComponent } from '../../components/validation/validation-email/validation-email.component';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router'

@Component({
  selector: 'app-email',
  standalone: true,
  imports: [MenuBarComponent,ValidationEmailComponent],
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent {



}
