import { Component } from '@angular/core';
import { RouterOutlet,RouterLink,RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css','./how-it-works-responsive.css']
})
export class HowItWorksComponent {

}
