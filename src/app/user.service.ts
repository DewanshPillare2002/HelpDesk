import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface UserInfo {
  id: string;
  name: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject allows components to subscribe and get updates
  private userSource = new BehaviorSubject<UserInfo | null>(null);
  user$ = this.userSource.asObservable();
 
  // Set user info
  setUser(user: UserInfo) {
    this.userSource.next(user);
  }
 
  // Get current user info (snapshot)
  getUser(): UserInfo | null {
    return this.userSource.value;
  }
 
  // Clear user info
  clearUser() {
    this.userSource.next(null);
  }
}
 