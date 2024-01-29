import { Component } from '@angular/core';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import { ChooseActionComponent } from '../../components/choose-action/choose-action.component';
import { AboutComponent } from '../../components/about/about.component';
@Component({
  selector: 'app-initial',
  standalone: true,
  imports: [MenuLoggedComponent,ChooseActionComponent,AboutComponent],
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {

}
