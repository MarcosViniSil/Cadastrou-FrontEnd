import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css', './menu-bar-responsive.css'],
})
export class MenuBarComponent {
  isMenuOpen: boolean = false;

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

      if(this.isMenuOpen && window.innerWidth < 610){
        containerLinksMenu.style.display ='block'
      }else if(!this.isMenuOpen && window.innerWidth < 610){
        containerLinksMenu.style.display ='none'
      }else{
        containerLinksMenu.style.display ='block'
      }
    }
  }
}
