import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import User from './User';

@Injectable({
  providedIn: 'root'
})
export class Rest1Service {

  constructor(private rest:HttpClient) { }
  strUrl:string="http://localhost:3000/User";

  getAllData():Observable<any>{
    return this.rest.get(this.strUrl);
  }

   insertData(userObj : User): Observable<any>{
    return this.rest.post(this.strUrl, userObj);
  }

  
  }

