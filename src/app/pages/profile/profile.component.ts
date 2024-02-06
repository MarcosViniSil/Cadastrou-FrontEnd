import { Component, OnInit } from '@angular/core';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../components/loading/loading.component';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MenuLoggedComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    LoadingComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private session: SessionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  userForm!: FormGroup;
  deleteAccountForm!: FormGroup;
  isToDeleteAccount:boolean=false
  ngOnInit() {
    const isAuthenticated = this.session.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
    this.initForm();
    this.getProfile();
  }

   updatePassword(){
      this.router.navigate(['atualizar/senha']);
   }

  getProfile() {
    const result = this.userService.profileUser();
    if (result != null) {
      result.subscribe({
        next: (res) => {
          
          this.userForm = this.formBuilder.group({
            name: [{ value: res.name, disabled: true },[Validators.required]],
            email: [{ value: res.email, disabled: true },[Validators.required, Validators.email]],
            registers: [{ value: res.numCards, disabled: true },[Validators.required]],
            datebegin: [{ value: res.createdAt, disabled: true },[Validators.required]],
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }



  initForm() {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      registers: ['', Validators.required],
      datebegin: ['', Validators.required],
    });
  }
  initDeleteAccountForm() {
    this.deleteAccountForm = this.formBuilder.group({
      deleteAccount: ['', Validators.required],
    });
  }
  requestDeleteAccount(){
    this.isToDeleteAccount=true
    this.initDeleteAccountForm() 
  }
  deleteAccount(){
    if(this.deleteAccountForm.value.deleteAccount === "Quero excluir minha conta"){
    const result =this.userService.requestDeleteAccount()
    if (result != null) {
      result.subscribe({
        next: (res) => {
          
         console.log(res)
         this.isToDeleteAccount = false;
        },
        error: (err) => {
          console.log(err);
          this.isToDeleteAccount = false;
        },
      });
    }
  }else{
    alert("Digite a frase corretamente")
  }
  }
  onBodyClick() {
    this.isToDeleteAccount = false;
  }
}
