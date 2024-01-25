import { Component,OnInit,ViewChild,ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router'
import { ValidateEmailService } from '../../../services/validateEmail.service'; 
import { Router } from '@angular/router';
import {FormBuilder,FormGroup,Validators,FormsModule,ReactiveFormsModule,} from '@angular/forms';
import {FormsComponent} from '../forms/forms.component'
import { codesData } from '../../../models/validateCodesData';

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
      private emailService:ValidateEmailService
      
    ) {}
    ngOnInit() {
      this.initForm()
      this.subscribeToFormChanges();
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
              console.log("resposta")
              console.log(res);
              console.log(this.userForm.value.email)
              localStorage.setItem('Code', res.code);
              localStorage.setItem('email', this.userForm.value.email);
              console.log("code armaz1",localStorage.getItem("Code"))
              this.isSend=true
            },
            error: (err) => {
              console.log("erro")
              console.log(err)
              this.validateForm.onError(err.error.title);
            },
          });
          
        }
      }
      
  

    validateCode(){
      console.log("code armaz2",localStorage.getItem("Code"))
      if (localStorage.getItem("Code") !== null) {
        const a: string | null = localStorage.getItem("Code");
      
        if (a !== null) {
          const codes: codesData = {
            codeUser: this.userForm2.value.text,
            codeToken: a,};

            const response=this.emailService.validateCodeEmail(codes)
            response.subscribe({
              next: (res:any) => {
                console.log("resposta")
                console.log(res);
                if(res==null){
                  this.router.navigate(['cadastrar']);
                }
  
              },
              error: (err) => {
                console.log("erro")
                console.log(err)
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
