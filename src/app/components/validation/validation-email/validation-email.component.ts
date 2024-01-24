import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-email.component.html',
  styleUrl: './validation-email.component.css'
})
export class ValidationEmailComponent {
    isSend:Boolean=false



    sendCode(){
      this.isSend=true
    }

    validateCode(){
       
    }
}
