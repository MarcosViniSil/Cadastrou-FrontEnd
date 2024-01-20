import { Component } from '@angular/core';
import { MenuBarComponent } from '../../components/menu-bar/menu-bar.component';
import { IntroductionComponent } from '../../components/introduction/introduction.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuBarComponent,IntroductionComponent,HowItWorksComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
