import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-payment-progress',
  standalone: false,
  templateUrl: './payment-progress.component.html',
  styleUrl: './payment-progress.component.css'
})
export class PaymentProgressComponent {
 
  constructor(private router : Router){}
ngOnInit(){
  setTimeout(() => {
    this.router.navigate(['/success']);
  }, 5000);
}
 
}