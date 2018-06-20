import {Injectable} from '@angular/core';
import {PERMISIONS} from './data';
import {UserService} from './user.service';
import { Observable, of } from 'rxjs';
import { map, tap} from 'rxjs/operators';

@Injectable()
export class AuthorizationService {
  private readonly WORKFLOW_EVENTS = PERMISIONS;
  private userRoles: Set<string>;

  constructor(private userService: UserService) {
  }

  public checkAuthorization(path: any): Observable<boolean> {
      return this.userService.getUser().pipe(
        map(currentUser => currentUser.roles),
        tap(roles => {
          const rolesData = roles.map(role => role.name);
          this.userRoles = new Set(rolesData);
        }),
        map(roles => this.doCheckAuthorization(path))
        );
  }

  private doCheckAuthorization(path: string[]): boolean {
    if (path.length) {
      const entry = this.findEntry(this.WORKFLOW_EVENTS, path);
      if (entry && entry['acceptedRoles'] && this.userRoles.size) {
        return entry.acceptedRoles.some(acceptedRole => this.userRoles.has(acceptedRole));
      }
      return false;
    }
    return false;
  }

  private findEntry(currentObject: any, keys: string[], index = 0) {
    const key = keys[index];
    if (currentObject[key] && index < keys.length - 1) {
      return this.findEntry(currentObject[key], keys, index + 1);
    } else if (currentObject[key] && index === keys.length - 1) {
      return currentObject[key];
    } else {
      return false;
    }
  }

}
