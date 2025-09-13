import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareData1Service {

  constructor() { }

  private messageSource = new BehaviorSubject<string> ('Initial Data');
  currentMessage = this.messageSource.asObservable();

  updateMessage(msg:string){
    this.messageSource.next(msg);
  }

}
