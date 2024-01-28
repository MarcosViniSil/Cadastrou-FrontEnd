import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router'
import { ValidateEmailService } from '../../../services/validateEmail.service'; 
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {FormsComponent} from '../forms/forms.component'
import { codesData } from '../../../models/validateCodesData';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'app-validation-email',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './validation-email.component.html',
  styleUrls: ['./validation-email.component.css','./validation-email-responsive.css']
})
export class ValidationEmailComponent implements OnInit {
    isSend:Boolean=false
    showError:Boolean=false
    messageError:String=""
    emailUser:string=""
    codeUser:string=""
    userForm!: FormGroup;
    userForm2!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private validateForm: FormsComponent,
      private router: Router,
      private emailService:ValidateEmailService,
      private userService: UserService
      
      
    ) {}
    ngOnInit() {
      this.initForm()
      this.subscribeToFormChanges();
      this.emailService.removeCodeEmail()
    }
    initForm() {
      this.userForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]]
      });
      this.userForm2 = this.formBuilder.group({
        text: ['', [Validators.required]]
      });
    }

    sendCode(){
        
        if(this.validateForm.validateEmail(this.userForm.value.email)){
          const email=this.userForm.value.email
          const response=this.emailService.sendCodeEmail(email)
          response.subscribe({
            next: (res:any) => {
              this.emailService.setCodeEmail(res.code)
              this.userService.setEmailUser(this.userForm.value.email)
              this.isSend=true
            },
            error: (err) => {
            
              this.validateForm.onError(err.error.title);
            },
          });
          
        }
      }
      
  

    validateCode(){
      
      if (localStorage.getItem("Code") !== null) {
        const codeCripty: string | null = this.emailService.getCodeEmail()
      
        if (codeCripty !== null) {
          const codes: codesData = {
            codeUser: this.userForm2.value.text,
            codeToken: codeCripty,};

            const response=this.emailService.validateCodeEmail(codes)
            response.subscribe({
              next: (res:any) => {
                console.log(res);
                
                if(res==null){
                  this.emailService.removeCodeEmail()
                  this.router.navigate(['cadastrar']);
                }
  
              },
              error: (err) => {
                this.validateForm.onError(err.error.title);
              },
            });

        }
      }
      
      
    }

    correctionEmail(){
      this.isSend=false
    }
    subscribeToFormChanges() {
      this.validateForm.showError$.subscribe((showError) => {
        this.showError = showError;
      });
      this.validateForm.messageError$.subscribe((messageError) => {
        this.messageError = messageError;
      });
    }
}
