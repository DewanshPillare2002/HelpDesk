import { CommonModule, NgFor, NgIf, NgSwitch } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PayementDataService } from '../payement-data.service';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css',
  standalone:false
})
export class SummaryComponent implements OnInit {

  
  constructor(private router: Router,
    private PaymentserviceObj: PayementDataService, private fb: FormBuilder, private route :ActivatedRoute, private paymentAPI : PaymentService) {
    

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
    // console.log(paymentDetails);

  // if (this.type === 'parking') {
  //   const details = {
  //     duration: this.paymentDetails.duration,  // in hours
  //     additional_hours: this.paymentDetails.additional_hours
  //   };
  //   this.calculateCharges('parking', details);
  // }

  // if (this.type === "subscriptions") {
  //   const details = {
  //     plan: paymentDetails.plan,
  //     period: paymentDetails.period
  //   };
  //   this.calculateCharges('subscriptions', details);
  // }

  // if (this.type === 'penalty') {
  //   const details = {
  //     overstay_hours: this.paymentDetails.overstay_hours
  //   };
  //   this.calculateCharges('penalty', details);
  // }



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
  // onSelect(vehicleNo: string) {
  //   this.selectedVehicle = this.Park.find(v => v.vehicle_no === vehicleNo);
  //   //calculate charges
  //   if (this.selectedVehicle) {
  //     this.calculateCharges(this.selectedVehicle);
  //   }
  // }


  //billing
  totalAmount: number = 0;
  baseCharge: number = 0;
  extraCharge: number = 0;

  // calculateCharges(vehicle: any) {
  //   const baseRate = 10;
  //   const extraRate = 20;

  //   // Extract hours from duration string like "3h 30m"
  //   const durationParts = vehicle.duration.split(' ');
  //   const hours = parseInt(durationParts[0].replace('h', ''), 10);
  //   const minutes = parseInt(durationParts[1].replace('m', ''), 10);

  //   const totalHours = hours + (minutes >= 30 ? 1 : 0); // Round up if >= 30 mins
  //   const baseCharge = totalHours * baseRate;
  //   const extraCharge = vehicle.additional_hours * extraRate;
  //   this.baseCharge = baseCharge;
  //   this.extraCharge = extraCharge;
  //   this.totalAmount = baseCharge + extraCharge;
  // }


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


    if (this.type === 'parking') {
      base = this.paymentDetails.duration * 10;
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
    console.log(this.charges)
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
    case 'parking':
      details = {
        ...baseDetails,
        vehicleNumber: this.paymentDetails.vehicle_no,
        parkingSpot: this.paymentDetails.parking_slot,
        entryTime: this.paymentDetails.entry_time,
        exitTime: this.paymentDetails.exit_time,
        duration: Math.round(this.paymentDetails.duration)
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
      this.router.navigate(['/success']);
    }
  }

  // payment forms validation

  get cardNumber() {
    return this.paymentForm.get('creditCard.cardNumber');
  }

}
