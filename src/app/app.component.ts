import { Component } from '@angular/core';
import {GATEAUX} from './data';
import {UserService} from './user.service';
import {MOCK_USERS, User} from './user';
import {AuthorizationService} from './authorization.service';
import {Observable} from 'rxjs/index';
import {tap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public users: User[] = MOCK_USERS;
  public gateaux = GATEAUX;
  public gateauxOnSale = [];
  public displayBlock = false;

  constructor(public userService: UserService,
              private authorizationService: AuthorizationService) {}

  addGateau(id: string) {
    this.gateauxOnSale.push(this.gateaux[id]);
  }

  eatGateau(i: number) {
   this.gateauxOnSale.splice(i, 1);
  }

  selectUser(selected) {
    this.userService.fetchUser(selected.value);
    this.displayBlock = false;
    setTimeout(() => {
      this.displayBlock = true;
    }, 100);
  }

  checkPermission(roles: string[]): Observable<boolean> {
    return this.authorizationService.checkAuthorization(roles).pipe(tap(response => console.log(response)));
  }
}
