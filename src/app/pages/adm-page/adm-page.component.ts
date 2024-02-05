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
  listUsers: any[] = [];
  listUsersToDelete: any[] = [];
  constructor(private userService: UserService) {}
   getUsers(){
    this.isToShowUsers=true
    this.isToDeleteUsers=false
    const response = this.userService.getUsers(this.offSetListUsers)
    if(response!=null){
      response.subscribe({
        next: (res) => {
           console.log(res)
           this.listUsers=this.listUsers.concat(res)
           this.offSetListUsers++
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
   }
   getUsersDelete(){
    this.isToDeleteUsers=true
    this.isToShowUsers=false
    const response = this.userService.getUsersToDelete(this.offsetDeleteUsers)
    if(response!=null){
      response.subscribe({
        next: (res) => {
          this.listUsersToDelete = this.listUsersToDelete.concat(res)
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
