import { Component, OnInit } from '@angular/core';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import { CommonModule } from '@angular/common';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { LoadingComponent } from '../../components/loading/loading.component';
@Component({
  selector: 'app-view-cards',
  standalone: true,
  imports: [MenuLoggedComponent, CommonModule],
  templateUrl: './view-cards.component.html',
  styleUrl: './view-cards.component.css',
})
export class ViewCardsComponent implements OnInit {
  offset: number = 0;
  cards: any[] = [];
  isFinishCards: boolean = false;
  hasCards: boolean = false;
  idDeleteAvailable: boolean = true;

  constructor(
    private session: SessionService,
    private router: Router,
    private cardService: CardService
  ) {}

  ngOnInit(): void {
    const isAuthenticated = this.session.isAuthenticated();
    if (!isAuthenticated) {
      this.router.navigate(['login']);
    }
    this.getListCards();
  }

  getListCards() {
    const result = this.cardService.getCards(this.offset);

    if (result != null) {
      console.log(result);
      result.subscribe({
        next: (res) => {
          if (res.card.length == 4) {
            let array = this.modifyArray(res.card);
            this.cards = this.cards.concat(array);
            this.offset++;
            this.hasCards = true;
            this.isFinishCards = false;
          } else if (res.card.length < 4) {
            let array=this.modifyArray(res.card);
            this.cards = this.cards.concat(array);
            this.isFinishCards = true;
            this.hasCards = true;
          }
          if (this.cards.length == 0) {
            this.hasCards = false;
            this.isFinishCards = true;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteCard(id: number) {
    if (this.idDeleteAvailable) {
      this.idDeleteAvailable = false;
      const result = this.cardService.deleteCard(id);
      if (result != null) {
        result.subscribe({
          next: (res) => {
            if (res == null) {
              this.idDeleteAvailable = true;
              this.cards = this.cards.filter((e) => e.id != id);
              if (this.cards.length == 0) {
                this.hasCards = false;
              }
            }
          },
          error: (err) => {
            this.idDeleteAvailable = true;
            console.log(err);
          },
        });
      }
    }
  }
  modifyArray(array: any[]): any[] {
    for (let i = 0; i < array.length; i++) {
      array[i].dateFinish = this.convertDate(array[i].dateFinish);
      array[i].frequency = this.convertFrequency(array[i].frequency);
    }
    return array;
  }
  convertDate(date: string): string {
    let dateObject = new Date(`${date}T00:00:00Z`);
    let day = dateObject.getUTCDate() + 1;
    let month = dateObject.getUTCMonth() + 1;
    let year = dateObject.getUTCFullYear();

    if (day > new Date(year, month, 0).getUTCDate()) {
      day = 1;
      month += 1;

      if (month > 12) {
        month = 1;
        year += 1;
      }
    }

    let formattedDate = `${day < 10 ? '0' : ''}${day}/${
      month < 10 ? '0' : ''
    }${month}/${year}`;

    return formattedDate;
  }
  convertFrequency(frequency: string): string {
    switch (frequency) {
      case 'LOW':
        return 'BAIXA';
      case 'AVERAGE':
        return 'MÉDIA';
      case 'HIGH':
        return 'ALTA';
    }
    return '';
  }
}
