import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  savedToken: string;
  constructor() { }
  storeToken(token: string) {
    this.savedToken = token['access_token'];
  }
}
