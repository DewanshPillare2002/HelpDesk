import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SlotBookingRestService } from './slotBookingRest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ParkingSlotManagement';
  slotmodule:any;
  constructor(private restservice:SlotBookingRestService, private route : Router){}
  ngOnInit(){
    this.route.navigate(['']);
  }
}
