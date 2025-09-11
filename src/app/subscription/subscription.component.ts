import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { Router } from '@angular/router';

@Component({
  
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css'],
  standalone:false
})
export class SubscriptionComponent {

constructor(private paymentAPI : PaymentService, private router : Router){}

  plans = [
    {
      name: 'Silver',
      price: 299,
      oldPrice: 399,
      period: '7 days',
      badge: 'Weekly',
      features: [
        'Up to 5 vehicles',
        'Basic parking analytics',
        'Email support',
        'Mobile app access',
        'Standard billing'
      ],
      color: '#00BFFF'
    },
    {
      name: 'Gold',
      price: 799,
      oldPrice: 1199,
      period: '30 days',
      badge: 'Most Popular',
      features: [
        'Up to 15 vehicles',
        'Advanced analytics & reports',
        'Priority support',
        'Multi-location access',
        'Custom billing',
        'Automated notifications'
      ],
      color: '#a855f7'
    },
    {
      name: 'Platinum',
      price: 2999,
      oldPrice: 4799,
      period: '90 days',
      badge: 'Quaterly',
      features: [
        'Unlimited vehicles',
        'Real-time analytics',
        '24/7 dedicated support',
        'White-label solution',
        'Advanced integrations',
        'Custom features',
        'API access'
      ],
      color: '#3b82f6'
    }
  ];

  subscribe(plan:any) {
    console.log(plan);

    const subObj={
      userId : 'U001',
      plan : plan.name,
      period : plan.period,
      days : plan.days,
      amount : plan.price,
      status : 'pending'
    } 
  this.paymentAPI.createPayment('subscriptions', subObj).subscribe(newSub=>{
    this.router.navigate(['checkout'],
      { queryParams : {id: newSub.id, type: 'subscriptions'}});
  });

  }
}
