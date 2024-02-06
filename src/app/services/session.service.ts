import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private tokenService: TokenService, private router: Router) {}

  isAuthenticated(): boolean {
    let dateToken: string | null = this.tokenService.getDateExpiration();

    if (dateToken == null) {
      this.router.navigate(['login']);
      return false;
    } else {
      let dateActual: RegExpMatchArray | null = this.getAllFieldsDate(
        this.getDateActual()
      );
      let dateTokenFormated: RegExpMatchArray | null =
        this.getAllFieldsDate(dateToken);

      if (dateActual != null && dateTokenFormated != null) {
       
        if((dateActual[5] <  dateTokenFormated[5])) {return true}
        if((dateActual[5] == dateTokenFormated[5]) && (dateActual[4] < dateTokenFormated[4])){return true}
        if((dateActual[5] == dateTokenFormated[5]) && (dateActual[4] == dateTokenFormated[4]) && (dateActual[3] < dateTokenFormated[3])){return true}
        if((dateActual[5] == dateTokenFormated[5]) && (dateActual[4] == dateTokenFormated[4]) && (dateActual[3] == dateTokenFormated[3]) && (dateActual[1] < dateTokenFormated[1])){return true}
        if((dateActual[5] == dateTokenFormated[5]) && (dateActual[4] == dateTokenFormated[4]) && (dateActual[3] == dateTokenFormated[3]) && (dateActual[1] == dateTokenFormated[1]) && (dateActual[2] <= dateTokenFormated[2])){return true}
        
        
      }
    }
    
    return false;
  }

  private getDateActual(): string {
    let dataActual = new Date();
    let hours = String(dataActual.getHours()).padStart(2, '0');
    let minutes = String(dataActual.getMinutes()).padStart(2, '0');
    let day = String(dataActual.getDate()).padStart(2, '0');
    let month = String(dataActual.getMonth() + 1).padStart(2, '0');
    let year = dataActual.getFullYear();
    let dateFormated = `${hours}:${minutes} ${day}/${month}/${year}`;
    return dateFormated
  }

  private getAllFieldsDate(dateString: string): RegExpMatchArray | null {
    let regex = /(\d{2}):(\d{2}) (\d{2})\/(\d{2})\/(\d{4})/;
    let match = dateString.match(regex);

    if (match) {
      /*
         <-MATCH->
         [1] => hours
         [2] => minutes
         [3] => day
         [4] => month
         [5] => year
        */
      return match;
    } else {
      return null;
    }
  }
}
