import { Component,HostListener,Input } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive,CommonModule],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css', './menu-bar-responsive.css'],
})
export class MenuBarComponent{
  constructor(private router: Router){}
  isMenuOpen: boolean = false

  @Input()
  showLogin:boolean=true
  @Input()
  showSignUp:boolean=true



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
    linkLogin(){
      this.router.navigate(['login']);
    }
    linkEmail(){
      this.router.navigate(['email']);
    }

}
