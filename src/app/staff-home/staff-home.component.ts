import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-staff-home',
  standalone: false,
  templateUrl: './staff-home.component.html',
  styleUrl: './staff-home.component.css'
})
export class StaffHomeComponent {
  title = 'Staff Home Page';
  bEntry : boolean = false;


  constructor(private router : Router, private shareStatus : ShareDataService){}

   goToEntryDetails()
  {
       this.router.navigate(['/Entry']);
  }

  goToExitDetails()
  {

      this.router.navigate(['/Exit']);
  }

}
