import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLoggedComponent } from '../../components/menu-logged/menu-logged.component';
import { UserService } from '../../services/user.service';
import { AdmService } from '../../services/adm.service';
@Component({
  selector: 'app-adm-page',
  standalone: true,
  imports: [CommonModule, MenuLoggedComponent],
  templateUrl: './adm-page.component.html',
  styleUrl: './adm-page.component.css',
})
export class AdmPageComponent {
  isToDeleteUsers: boolean = true;
  isToShowUsers: boolean = true;
  offSetListUsers: number = 0;
  offsetDeleteUsers: number = 0;
  listUsers: any[] = [];
  listUsersToDelete: any[] = [];
  isFinishUsers: boolean = false;
  isFinishUsersToDelete: boolean = false;

  constructor(
    private userService: UserService,
    private admService: AdmService
  ) {}
  getUsers() {
    this.listUsersToDelete=[]
    this.isToShowUsers = false;
    this.isToDeleteUsers = true;
    const response = this.admService.getUsers(this.offSetListUsers);
    if (response != null) {
      response.subscribe({
        next: (res) => {
          this.listUsers = this.listUsers.concat(res);
          if (res.length == 4) {
            this.offSetListUsers++;
            this.isFinishUsers = false;
          } else if (res.length < 4) {
            this.isFinishUsers = true;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
  getUsersDelete() {
    this.listUsers = []
    this.isToDeleteUsers = false;
    this.isToShowUsers = true;
    const response = this.admService.getUsersToDelete(this.offsetDeleteUsers);
    if (response != null) {
      response.subscribe({
        next: (res) => {
          this.listUsersToDelete = this.listUsersToDelete.concat(res);
          if (res.length == 4) {
            this.offsetDeleteUsers++;
            this.isFinishUsersToDelete = false;
          } else if (res.length < 4) {
            this.isFinishUsersToDelete = true;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  deleteUser(id: number) {
    const response = this.admService.deleteUserById(id);
    if (response != null) {
      response.subscribe({
        next: (res) => {
          if (res == null) {
            this.listUsersToDelete = this.listUsersToDelete.filter(
              (user) => user.id !== id
            );
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
