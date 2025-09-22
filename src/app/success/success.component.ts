import { Component } from '@angular/core';
import { PayementDataService } from '../payement-data.service';
import { CommonModule, DatePipe } from '@angular/common';
import jsPDF from 'jspdf';
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
downloadPDF() {
  const doc = new jsPDF();
 
  doc.setFontSize(16);
  doc.text('Invoice', 10, 10);
  doc.text('Customer: John Doe', 10, 20);
  doc.text('Amount: ₹2500', 10, 30);
  doc.text('Date: 16 Sep 2025', 10, 40);
 
  doc.save('invoice.pdf');
}
}
