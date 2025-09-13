import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Users } from './usersListInterface';
import Staff from './staffListInterface';

@Injectable({
  providedIn: 'root'
})
export class RestServiceService {

  constructor(private restService : HttpClient) { }
  StaffDetailsUrl : string = 'http://localhost:3000/Staff';
  userDetailsUrl : string = 'http://localhost:3000/User';
  feedbackUrl : string = 'http://localhost:3000/Feedback';
  adminDetailsUrl : string = 'http://localhost:3000/Admin';

  provideAdmin() : Observable<any>{
    return this.restService.get(this.adminDetailsUrl);
  }

  provideFeedback() : Observable<any>{
    return this.restService.get(this.feedbackUrl);
  }

  provideStaffData() : Observable<any>{
    return this.restService.get(this.StaffDetailsUrl);
  }

  provideUsersData() : Observable<any>{
    return this.restService.get(this.userDetailsUrl);
  }

  editUserDetailsInBackend(userObj : Users) : Observable<any>{
    let editUserDetailsUrl : string = this.userDetailsUrl + '/' + userObj.id;
    return this.restService.put(editUserDetailsUrl, userObj);
  }

  editStaffMemberDetailsInBackend(staffObj : Staff) : Observable<any>{
    let staffMemberDetailsUrl : string = this.StaffDetailsUrl + '/' + staffObj.id;
    return this.restService.put(staffMemberDetailsUrl, staffObj);
  }

  addStaffMemberDetailsInBackend(staffObj : Staff) : Observable<any>{
    return this.restService.post(this.StaffDetailsUrl, staffObj);
  }

  deleteUser(id : string) : Observable<any>{
    let deleteUserUrl : string = this.userDetailsUrl + '/' + id;
    return this.restService.delete(deleteUserUrl);
  }

  deleteStaff(id : string) : Observable<any>{
    let deleteStaffUrl : string = this.StaffDetailsUrl + '/' + id;
    return this.restService.delete(deleteStaffUrl);
  }
}
