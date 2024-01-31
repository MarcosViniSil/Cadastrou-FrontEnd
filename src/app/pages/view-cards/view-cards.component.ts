import { Component } from '@angular/core';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [MenuLoggedComponent,CommonModule],
  templateUrl: './view-cards.component.html',
  styleUrl: './view-cards.component.css'
})
export class ViewCardsComponent {
  dogs: any[] = [
    {
      id: 1,
      name: 'teste nome1',
      description: 'esta é uma descrição',
      frequency: "Baixa",
      dateFinish:"12/02/2024"
    },
    {
      id: 2,
      name: 'teste nome2',
      description: 'aqui outra descrição',
      frequency: "média",
      dateFinish:"13/02/2024"
    },
    {
      id: 3,
      name: 'teste nome3',
      description: 'aqui outra descrição aqui',
      frequency: "Alta",
      dateFinish:"03/02/2024"
    },
    {
      id: 4,
      name: 'teste nome4',
      description: 'aqui está outra descrição aqui',
      frequency: "Baixa",
      dateFinish:"23/03/2024"
    },
    {
      id: 4,
      name: 'teste nome4',
      description: 'aqui está outra descrição aqui',
      frequency: "Baixa",
      dateFinish:"23/03/2024"
    },
    
  ];

  teste(id:number){
    console.log(id)
  }
}
