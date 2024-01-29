import { Component,OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-choose-action',
  standalone: true,
  imports: [],
  templateUrl: './choose-action.component.html',
  styleUrl: './choose-action.component.css'
})
export class ChooseActionComponent implements OnInit {

  constructor(private session: SessionService,private router: Router) {}

  ngOnInit(): void {
    // const isAuthenticated = this.session.isAuthenticated()
    // if(!isAuthenticated){
    //   this.router.navigate(['login'])
    // }

  }

  register(){
    this.router.navigate(['cadastrar/card'])
  }
}
