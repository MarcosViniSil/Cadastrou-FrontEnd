import { Component,HostListener,Input,OnInit } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-menu-logged',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './menu-logged.component.html',
  styleUrls: ['./menu-logged.component.css','./menu-logged-responsive.css']
})
export class MenuLoggedComponent implements OnInit {
  constructor(private router: Router,private tokenService:TokenService,private userService:UserService){}

  isMenuOpen: boolean = false
  isUserAdm:boolean=false
  
  @Input()
  isToShowRegistrations:boolean=false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleMenuBasedOnWindowSize();
  }
  ngOnInit(){
    this.getRoleUser()
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.toggleMenuBasedOnWindowSize();
  }


  private toggleMenuBasedOnWindowSize() {
    const containerLinksMenu = document.getElementById('responsive-menu');

    if (containerLinksMenu != null) {

      if(this.isMenuOpen && window.innerWidth < 640){
        containerLinksMenu.style.display ='block'
      }else if(!this.isMenuOpen && window.innerWidth < 640){
        containerLinksMenu.style.display ='none'
      }else{
        containerLinksMenu.style.display ='block'
      }
    }
  }

  linkInitial(){
    this.router.navigate(['inicial']);
  }
  profile(){
    this.router.navigate(['perfil']);
  }
  linkAdmPage(){
    this.router.navigate(['pagina/adm']);
  }
  logout(){
    this.tokenService.removeTokenUser()
    this.tokenService.removeDataExpiration()
    this.router.navigate(['login'])
  }
  getRoleUser(){
    const response = this.userService.getRoleUser()
    if(response!=null){
      response.subscribe({
        next: (res) => {
          if (res.role == "ADMIN") {
            this.isUserAdm=true
          }
        },
        error: (err) => {
           console.log(err)
        },
      });
    }
  }
}
