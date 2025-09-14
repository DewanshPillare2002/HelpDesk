import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  //Send Boolean Message for form content change at the entryForm
  private flagValue = new BehaviorSubject<boolean>(false);
  currentFlagValue = this.flagValue.asObservable();

  private formContentChange = new BehaviorSubject<boolean>(true);
  currentState = this.formContentChange.asObservable();

  updateState(state : boolean){
    this.formContentChange.next(state);
  }

  updateFlag(clicked : boolean){
    this.flagValue.next(clicked);
  }
}
