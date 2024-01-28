import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register-card',
  standalone: true,
  imports: [],
  templateUrl: './register-card.component.html',
  styleUrl: './register-card.component.css',
})
export class RegisterCardComponent implements OnInit {

  constructor(private session: SessionService,private router: Router) {}

  ngOnInit(): void {
    const isAuthenticated = this.session.isAuthenticated()
    
    if(!isAuthenticated){
      this.router.navigate(['login'])
    }

  }
}
