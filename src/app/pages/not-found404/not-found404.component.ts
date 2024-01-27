import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-not-found404',
  standalone: true,
  imports: [],
  templateUrl: './not-found404.component.html',
  styleUrl: './not-found404.component.css'
})
export class NotFound404Component {
  constructor(private router: Router){}

  linkLogin(){
    this.router.navigate(['login']);
  }
  linkHome(){
    this.router.navigate(['']);
  }
}
