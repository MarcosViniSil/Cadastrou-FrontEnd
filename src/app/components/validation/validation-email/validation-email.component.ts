import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-validation-email',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-email.component.html',
  styleUrls: ['./validation-email.component.css','./validation-email-responsive.css']
})
export class ValidationEmailComponent {
    isSend:Boolean=false



    sendCode(){
      this.isSend=true
    }

    validateCode(){
       
    }

    correctionEmail(){
      this.isSend=false
    }
}
