import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-introduction',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css','./introduction-responsive.component.css']
})
export class IntroductionComponent {

}
