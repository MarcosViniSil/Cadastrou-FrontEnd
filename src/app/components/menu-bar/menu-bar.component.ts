import { Component } from '@angular/core';
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

  toggleMenu() {
    let containerLinksMenu = document.getElementById("responsive-menu");

    if (containerLinksMenu != null) {
      containerLinksMenu.style.display = (containerLinksMenu.style.display === "none" || containerLinksMenu.style.display === "") ? "block" : "none";
    }
  }
}
