export class User {
  name: string;
  roles: any;
}

export enum Roles {
 Boulanger,
  Client
}

export const MOCK_USERS: User[] = [{name: 'Boulanger', roles : [{name: 'Boulanger'}]},
  {name: 'Client', roles : [{name: 'Client'}]}, {name: 'Full', roles : [{name: 'Boulanger'}, {name: 'Client'}]}];
