import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAQ } from './help-feedback/faq';

@Injectable({
  providedIn: 'root'
})

export class SearchQueService {
  constructor(private http : HttpClient) {}

  private apiUrl : string = "http://localhost:3000/faqs";

  getFaqs() : Observable<FAQ[]>{
    return this.http.get<FAQ[]>(this.apiUrl);
  }


}
