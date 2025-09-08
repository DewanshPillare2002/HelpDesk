import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Feedback from './feedback/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  // Dependency Injection of HttpClient
  constructor(private rest : HttpClient) { }

  strUrl : string = "http://localhost:3000/Feedback";

  getAllData() : Observable<any>{
    return this.rest.get(this.strUrl);
  }

  insertData(feedbackObj : Feedback) : Observable<any>{
    return this.rest.post(this.strUrl, feedbackObj);
  }
}
