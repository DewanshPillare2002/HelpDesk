
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementDataService {

  constructor() { }

 private paymentDetails = new BehaviorSubject<any> (null);

 currentpaymentDetails = this.paymentDetails.asObservable();

 updatePaymentDetails(details : any){
  this.paymentDetails.next(details);
 }



}
