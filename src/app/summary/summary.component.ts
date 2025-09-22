import { CommonModule, NgFor, NgIf, NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 
import { PayementDataService } from '../payement-data.service';
import { PaymentService } from '../payment.service';
import { SlotBookingRestService } from '../slotBookingRest.service';
import slotmodule from '../slotpage/slotmodule';
 
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  standalone:false
})
export class SummaryComponent implements OnInit {
 
 
  constructor(private router: Router,
    private PaymentserviceObj: PayementDataService, private fb: FormBuilder, private route :ActivatedRoute, private paymentAPI : PaymentService,private sloTAPI : SlotBookingRestService) {
   
 
  }
  //payment forms
 
  paymentForm!: FormGroup;
 
 
  //Payment Details
  type! : string;
  id! : any;
  paymentDetails! : any;
 
  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      creditCard: this.fb.group({
        cardNumber: ['', []],
        expiry: ['', []],
        cvc: ['', []]
      }),
      upi: this.fb.group({
        upiId: ['', []]
      }),
      cash : ['',[]]
    });
 
    this.paymentForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      if (method === 'creditCard') {
        this.setCreditCardValidators();
      } else if (method === "upi") {
        this.setUpiValidators();
      }
    });
 
 
    //paymentAPI
    this.route.queryParamMap.subscribe(params=>{
      this.type = params.get('type')!;
      this.id = params.get('id');
    })
   
   
    this.paymentAPI.getPaymentDetails(this.type as any,this.id).subscribe(data=>{
      this.paymentDetails = data;
      this.calculateCharges();
    })
    console.log(this.paymentDetails);
   
   
  }
 
 
 
  //PaymentForm Validators
  setCreditCardValidators() {
    const group = this.paymentForm.get('creditCard');
    group!.get('cardNumber')?.setValidators([Validators.required, Validators.minLength(12)]);
    group!.get('expiry')?.setValidators([Validators.required]);
    group!.get('cvc')?.setValidators([Validators.required, Validators.minLength(3)]);
    group!.get('cardNumber')?.updateValueAndValidity();
    group!.get('expiry')?.updateValueAndValidity();
    group!.get('cvc')?.updateValueAndValidity();
    this.clearUpiValidators();
  }
 
  setUpiValidators() {
    const group = this.paymentForm.get('upi');
    group!.get('upiId')?.setValidators([Validators.required, Validators.pattern(/^.+@.+$/)]);
    group!.get('upiId')?.updateValueAndValidity();
    this.clearCreditCardValidators();
  }
 
  clearCreditCardValidators() {
    const group = this.paymentForm.get('creditCard');
    group!.get('cardNumber')?.clearValidators();
    group!.get('expiry')?.clearValidators();
    group!.get('cvc')?.clearValidators();
    group!.get('cardNumber')?.updateValueAndValidity();
    group!.get('expiry')?.updateValueAndValidity();
    group!.get('cvc')?.updateValueAndValidity();
  }
 
  clearUpiValidators() {
    const group = this.paymentForm.get('upi');
    group!.get('upiId')?.clearValidators();
    group!.get('upiId')?.updateValueAndValidity();
  }
 
 
  //select payment method card dropdons
  selectedPaymentMethod: string = "cash";
  onPaymentMethodChange(method1: string) {
    this.selectedPaymentMethod = method1;
  }
 
 
  selectedVehicle: any = null;
  selectedVehicleNo: string = '';
 
  //billing
  totalAmount: number = 0;
  baseCharge: number = 0;
  extraCharge: number = 0;
 
  //calculate charge
  charges = {
  baseCharge: 0,
  extraCharge: 0,
  tax: 0,
  totalAmount: 0
};
 
calculateCharges() {
    let base = 0;
    let extra = 0;
 
 
    if (this.type === 'parkingPayments') {
      base = this.paymentDetails.amount * 1;
      extra = this.paymentDetails.additional_hours
                ? this.paymentDetails.additional_hours * 10
                : 0;
    }
 
    if (this.type === 'subscriptions') {
      switch (this.paymentDetails.plan) {
        case 'Silver':
          base = 299; this.paymentDetails.period = '7 Days'; break;
        case 'Gold':
          base = 799; this.paymentDetails.period = '30 Days'; break;
        case 'Platinum':
          base = 2999; this.paymentDetails.period = '90 Days'; break;
      }
    }
 
    if (this.type === 'penalty') {
      base = this.paymentDetails.overstay_hours * 20;
    }
 
    const tax = (base + extra) * 0.18;
    const total = base + extra + tax;
 
    // push results back to object
    this.charges.baseCharge = Math.round(base);
    this.charges.extraCharge = Math.round(extra);
    this.charges.tax = Math.round(tax);
    this.charges.totalAmount = Math.round(total);
   
  }
 
  //payment method dropdown and forms
  showForm = true;
  isDropdownOpen = false;
  selectedMethod: string | null = null;
 
 
  cardDetails = { number: '', name: '', expiry: '', cvv: '' };
  upiId = '';
 
 
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
 
 
  selectMethod(method: string) {
    this.paymentForm.get('paymentMethod')?.setValue(method);
    this.selectedMethod = method;
    this.isDropdownOpen = false;
 
 
    // reset animation
    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    }, 500);
  }
  getLabel(method: string): string {
    switch (method) {
      case 'creditCard':
        return '💳 Credit/Debit Card';
      case 'upi':
        return '📱 UPI Payment';
      case 'cash':
        return '💵 Cash';
      default:
        return method;
    }
  }
  //checkout
  //create Invoice
  createInvoice() {
    const type = this.type;
  const baseDetails: any = {
    InvoiceId: 'INV-' + Math.floor(Math.random() * 1000000),
    Timestamp: new Date(),
    paymentMethod: this.selectedMethod,
    amount: Math.round(this.charges.totalAmount),   // always rounded
    type: this.type
  };
 
 
  let details: any;
 const paymentDetails = this.paymentDetails
 
  switch (this.type) {
    case 'parkingPayments':
      details = {
        ...baseDetails,
        userId: this.paymentDetails.userId,
        slot: this.paymentDetails.slot,
        date : this.paymentDetails.date,
        exitTime: this.paymentDetails.exit_time,
        period: this.paymentDetails.period
      };
      break;
 
 
    case 'subscriptions':
      details = {
        ...baseDetails,
        userId: paymentDetails.userId,
        plan: paymentDetails.plan,
        duration: paymentDetails.period   // map period → duration for UI
      };
      break;
 
 
    case 'penalty':
      details = {
        ...baseDetails,
        vehicleNumber: this.paymentDetails.vehicle_no,
        parkingSpot: this.paymentDetails.parking_slot,
        additionalHours: Math.round(this.paymentDetails.additional_hours),
        baseCharge: Math.round(this.paymentDetails.baseCharge),
        extraCharge: Math.round(this.paymentDetails.extraCharge)
      };
      break;
 
 
    default:
      details = baseDetails; // fallback
      break;
  }
 
 
  console.log('Generated Invoice:', details);
  return details;
}
 
  confirmPayment() {
    this.paymentForm.markAllAsTouched();
 
    if (this.paymentForm.invalid) {
      alert("Enter correct details");
      console.log(this.paymentForm.status);
      return;
    }
    if (this.selectedMethod === "") { alert('Please select a Payment Method'); }
    else {
 
     
      this.paymentForm.reset();
     
this.PaymentserviceObj.updatePaymentDetails(this.createInvoice());
      // console.log(details);
if(this.type== 'parkingPayments'){ this.confirmslot();}
      this.router.navigate(['/progress']);
    }
  }
 
//confirm slot for current Parking
confirmslot():void{
  let paymentDetails = this.paymentDetails;
    const slotData ={
      slot: this.paymentDetails.slot,
      date: this.paymentDetails.date,
      userid: this.paymentDetails.userId,
      parkingType: this.paymentDetails.parkingType
    };
    this.sloTAPI.insertData(slotData).subscribe({
      next:(response)=>{
        console.log('Slot Booking is Successful'+response);
     
      },
      error:(err)=>{
        console.log('Error Booking Slot:',err);
        alert('failed to book your slot');
      }
    })
  }
 
  // payment forms validation
 
  get cardNumber() {
    return this.paymentForm.get('creditCard.cardNumber');
  }
 
}