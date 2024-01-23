import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  
  private showErrorSubject = new BehaviorSubject<boolean>(false);
  private messageErrorSubject = new BehaviorSubject<string>('');
  showError$ = this.showErrorSubject.asObservable();
  messageError$ = this.messageErrorSubject.asObservable();

  get showError(): boolean {
    return this.showErrorSubject.value;
  }

  set showError(value: boolean) {
    this.showErrorSubject.next(value);
  }

  
   validateName(name: string): Boolean {
 
    if (name.length > 2) {
      console.log("invalido")
      return true;
    } else {
      this.onError('Nome inválido');
      return false;
    }
  }
   validatePassword(password: string): Boolean {
 
    if (password.length >= 8 && password.length <= 20) {
      return true;
    } else {
      console.log("invalido")
      this.onError('A senha deve conter no mínimo 8 e no máximo 20 carateres');
      return false;
    }
  }
   validateEmail(email: string): Boolean {

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex.test(email)) {
      return true;
    } else {
      this.onError('Formato de email inválido');
      return false;
    }
  }

 onError(message: string) {

    this.showError = true;
    this.messageErrorSubject.next(message);
    setTimeout(() => {
      this.showError = false;
      
    }, 5000);
  }
}
