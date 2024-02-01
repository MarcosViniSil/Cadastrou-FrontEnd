import { Component,HostListener,Input } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-menu-logged',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './menu-logged.component.html',
  styleUrls: ['./menu-logged.component.css','./menu-logged-responsive.css']
})
export class MenuLoggedComponent {
  constructor(private router: Router,private tokenService:TokenService){}
  isMenuOpen: boolean = false
  isUserAdm:boolean=false
  
  @Input()
  isToShowRegistrations:boolean=false

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleMenuBasedOnWindowSize();
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
  logout(){
    this.tokenService.removeTokenUser()
    this.tokenService.removeDataExpiration()
    this.router.navigate(['login'])
  }
}
