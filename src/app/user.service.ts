import {Injectable} from '@angular/core';
import {MOCK_USERS, Roles, User} from './user';
import {BehaviorSubject, Observable} from 'rxjs/index';

@Injectable()
export class UserService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  private hasUser = false;

  constructor() {
  }

  public getUser(): Observable<User> {
    if (!this.hasUser) {
      this.fetchUser(0);
    }
    return this.user.asObservable();
  }

  public fetchUser(index: number): void {
    this.user.next(MOCK_USERS[index]);
    this.hasUser = true;
  }

}
