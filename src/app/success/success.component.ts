import { Component } from '@angular/core';
import { PayementDataService } from '../payement-data.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrl: './success.component.css',
  standalone:false
})
export class SuccessComponent {
paymentDetails : any;

constructor(private paymentObj : PayementDataService){}

ngOnInit(){
  this.paymentObj.currentpaymentDetails.subscribe(details =>{
    this.paymentDetails = details;
  })
}

}
