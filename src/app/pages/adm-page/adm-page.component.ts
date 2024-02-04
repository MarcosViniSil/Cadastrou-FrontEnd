import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-adm-page',
  standalone: true,
  imports: [CommonModule, MenuLoggedComponent],
  templateUrl: './adm-page.component.html',
  styleUrl: './adm-page.component.css',
})
export class AdmPageComponent {
  isToDeleteUsers:boolean=false
  isToShowUsers:boolean=false
  offSetListUsers:number=0
  offsetDeleteUsers:number=0
  listUsers: any[] = [
    { id: 1, name: 'John', cards: 25 },
    { id: 2, name: 'Jane', cards: 30 },
    { id: 3, name: 'Bob', cards: 35 },
    { id: 4, name: 'Alice', cards: 20 },
    { id: 5, name: 'Mike', cards: 40 },
  ];
  listUsersToDelete: any[] = [
    { id: 1, name: 'John', cards: 25 },
    { id: 2, name: 'Jane', cards: 30 },
    { id: 3, name: 'Bob', cards: 35 },
    { id: 4, name: 'Alice', cards: 20 },
    { id: 5, name: 'Mike', cards: 40 },
  ];
  constructor(private userService: UserService) {}

   viewDelete(){
    this.isToDeleteUsers=true
    this.isToShowUsers=false
   }
   viewUsers(){
    this.isToShowUsers=true
    this.isToDeleteUsers=false
   }
   getUsers(){
    const response = this.userService.getUsers(this.offSetListUsers)
    if(response!=null){
      response.subscribe({
        next: (res) => {
           console.log(res)
           this.offSetListUsers++
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
   }
   getUsersDelete(){
    const response = this.userService.getUsersToDelete(this.offsetDeleteUsers)
    if(response!=null){
      response.subscribe({
        next: (res) => {
           console.log(res)
           this.offsetDeleteUsers++
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
   }

}
