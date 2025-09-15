//ORIGINAL FILE

/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import  EntryDetails  from '../EntryDetails';

@Component({
  selector: 'app-entry-details',
  standalone: false,
  templateUrl: './entry-details.component.html',
  styleUrl: './entry-details.component.css'
})
export class EntryDetailsComponent {
  title = 'Entry Details';

  entryDetailsForm! : FormGroup;
  entryDetailsList! : EntryDetails[];
  constructor(private router: Router, private fb : FormBuilder, private db : DbServiceService)
  {
      this.entryDetailsForm = this.fb.group({
      vehicleType : ['',Validators.required],
      wheelerType : ['',Validators.required],
      vehicleNumber: ['',Validators.required,Validators.maxLength(13)],
      entryTime:['',Validators.required],
      custID:['',Validators.required,Validators.maxLength(5)],
      slotID:['',Validators.required,Validators.maxLength(3)]
    });*/

      /*this.entryDetailsForm = this.fb.group({
        vehicleType : [''],
        wheelerType : [''],
        vehicleNumber : [''],
        entryTime:[''],
        custID:[''],
        slotID:['']
      })
  }*/

  //Value from Reactive Entry Details Forms

  /*EntryForm() : void
  {
    if(this.entryDetailsForm.invalid){
      alert('Please Fill out all required Fields correctly')
      this.entryDetailsForm.markAllAsTouched();
      return;
    }
    let vehicleType = this.entryDetailsForm.get(['vehicleType'])?.value;
    let wheelerType = this.entryDetailsForm.get(['wheelerType'])?.value;
    let vehicleNumber = this.entryDetailsForm.get(['vehicleNumber'])?.value;
    let entryTime = this.entryDetailsForm.get(['entryTime'])?.value;
    let custID = this.entryDetailsForm.get(['custID'])?.value;
    let slotID = this.entryDetailsForm.get(['slotID'])?.value;


    let entryDetailsRec : EntryDetails = new EntryDetails(vehicleType,wheelerType,vehicleNumber,entryTime,custID,slotID);


    //Call the service with this data to insert record into json

    this.db.insertDetails(entryDetailsRec).subscribe({
      next : (data) => {},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('INSERT SUCCESSFUL')
    });

    this.entryDetailsForm.reset({
      vehicleType : '',
      wheelerType : '',
      vehicleNumber : '',
      entryTime : '',
      custID : '',
      slotID : ''
    });
  }

  get vehicleType(){
    return this.entryDetailsForm.get(['vehicleType']);
  }
  get wheelerType(){
    return this.entryDetailsForm.get(['wheelerType']);
  }
  get vehicleNumber(){
    return this.entryDetailsForm.get(['vehicleNumber']);
  }
  get entryTime(){
    return this.entryDetailsForm.get(['entryTime']);
  }
  get custID(){
    return this.entryDetailsForm.get(['custID']);
  }
  get slotID(){
    return this.entryDetailsForm.get(['slotID']);
  }

  goToHome():void{
    this.router.navigate(['/home']);
  }
}*/




/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import EntryDetails from '../EntryDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-entry-details',
  standalone: false,
  templateUrl: './entry-details.component.html',
  styleUrl: './entry-details.component.css'
})
export class EntryDetailsComponent {
  title = 'Entry Details';
  entryDetailsForm!: FormGroup;
  entryDetailsList!: EntryDetails[];

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.entryDetailsForm = this.fb.group({
      vehicleType: ['', Validators.required],
      wheelerType: ['', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.maxLength(13)]],
      entryTime: ['', Validators.required],
      custID: ['', [Validators.required, Validators.maxLength(5)]],
      slotID: ['', [Validators.required, Validators.maxLength(3)]]
    });
  }

  EntryForm(): void {
    if (this.entryDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly', 'danger');
      this.entryDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.entryDetailsForm.get('vehicleNumber')?.value;

    this.db.checkVehicleNumberExists(vehicleNumber).subscribe(({ entryExists, exitExists }) => {
      // Condition: Found in EntryDetails and NOT in ExitDetails means it's still parked
      if (entryExists && !exitExists) {
        this.showAlert('The vehicle number is already registered.', 'danger');
      } else {
        const vehicleType = this.entryDetailsForm.get('vehicleType')?.value;
        const wheelerType = this.entryDetailsForm.get('wheelerType')?.value;
        const entryTime = this.entryDetailsForm.get('entryTime')?.value;
        const custID = this.entryDetailsForm.get('custID')?.value;
        const slotID = this.entryDetailsForm.get('slotID')?.value;

        const entryDetailsRec: EntryDetails = new EntryDetails(vehicleType, wheelerType, vehicleNumber, entryTime, custID, slotID);

        this.db.insertDetails(entryDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle entry logged successfully!', 'success');
            console.log('INSERT SUCCESSFUL', data);
            this.entryDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => {
            console.log('INSERT COMPLETE');
          }
        });
      }
    });
  }

  showAlert(message: string, type: string) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
      alertPlaceholder.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <div>${message}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      alertPlaceholder.appendChild(wrapper);

      if (type === 'success' || type === 'danger') {
        const alert = new bootstrap.Alert(wrapper.querySelector('.alert'));
        setTimeout(() => {
          alert.close();
        }, 3000);
      }
    }
  }

  get vehicleType() {
    return this.entryDetailsForm.get('vehicleType');
  }
  get wheelerType() {
    return this.entryDetailsForm.get('wheelerType');
  }
  get vehicleNumber() {
    return this.entryDetailsForm.get('vehicleNumber');
  }
  get entryTime() {
    return this.entryDetailsForm.get('entryTime');
  }
  get custID() {
    return this.entryDetailsForm.get('custID');
  }
  get slotID() {
    return this.entryDetailsForm.get('slotID');
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}*/



/*import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import EntryDetails from '../EntryDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-entry-details',
  standalone: false,
  templateUrl: './entry-details.component.html',
  styleUrl: './entry-details.component.css'
})
export class EntryDetailsComponent {
  title = 'Entry Details';
  entryDetailsForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.entryDetailsForm = this.fb.group({
      vehicleType: ['', Validators.required],
      wheelerType: ['', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.maxLength(13)]],
      entryTime: ['', Validators.required],
      custID: ['', [Validators.required, Validators.maxLength(5)]],
      slotID: ['', [Validators.required, Validators.maxLength(3)]]
    });
  }

  EntryForm(): void {
    if (this.entryDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly', 'danger');
      this.entryDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.entryDetailsForm.get('vehicleNumber')?.value;

    this.db.getCurrentlyParkedVehicle(vehicleNumber).subscribe(currentEntry => {
      if (currentEntry) {
        this.showAlert('The vehicle is currently parked and cannot be re-entered.', 'danger');
      } else {
        const vehicleType = this.entryDetailsForm.get('vehicleType')?.value;
        const wheelerType = this.entryDetailsForm.get('wheelerType')?.value;
        const entryTime = this.entryDetailsForm.get('entryTime')?.value;
        const custID = this.entryDetailsForm.get('custID')?.value;
        const slotID = this.entryDetailsForm.get('slotID')?.value;

        const entryDetailsRec: EntryDetails = new EntryDetails(vehicleType, wheelerType, vehicleNumber, entryTime, custID, slotID);

        this.db.insertDetails(entryDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle entry logged successfully!', 'success');
            console.log('INSERT SUCCESSFUL', data);
            this.entryDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => {
            console.log('INSERT COMPLETE');
          }
        });
      }
    });
  }

  showAlert(message: string, type: string) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
      alertPlaceholder.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <div>${message}</div>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      `;
      alertPlaceholder.appendChild(wrapper);

      if (type === 'success' || type === 'danger') {
        const alert = new bootstrap.Alert(wrapper.querySelector('.alert'));
        setTimeout(() => {
          alert.close();
        }, 3000);
      }
    }
  }

  get vehicleType() {
    return this.entryDetailsForm.get('vehicleType');
  }
  get wheelerType() {
    return this.entryDetailsForm.get('wheelerType');
  }
  get vehicleNumber() {
    return this.entryDetailsForm.get('vehicleNumber');
  }
  get entryTime() {
    return this.entryDetailsForm.get('entryTime');
  }
  get custID() {
    return this.entryDetailsForm.get('custID');
  }
  get slotID() {
    return this.entryDetailsForm.get('slotID');
  }

  goToHome(): void {
    this.router.navigate(['/home']);
  }
}*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbServiceService } from '../db-service.service';
import EntryDetails from '../EntryDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-entry-details',
  standalone: false,
  templateUrl: './entry-details.component.html',
  styleUrl: './entry-details.component.css'
})
export class EntryDetailsComponent {
  title = 'Entry Details';
  entryDetailsForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.entryDetailsForm = this.fb.group({
      vehicleType: ['', Validators.required],
      wheelerType: ['', Validators.required],
      vehicleNumber: ['', [Validators.required, Validators.maxLength(10)]],
      entryDate: ['',Validators.required],
      entryTime: ['', Validators.required],
      custID: ['', Validators.required],
      slotID: ['', [Validators.required, Validators.maxLength(3)]]
    });
  }

  EntryForm(): void {
    if (this.entryDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly', 'danger');
      this.entryDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.entryDetailsForm.get('vehicleNumber')?.value;

    this.db.getVehicleCounts(vehicleNumber).subscribe(({ entryCount, exitCount }) => {
      // Condition: The vehicle can be entered if the entry count equals the exit count.
      if (entryCount === exitCount) {
        const vehicleType = this.entryDetailsForm.get('vehicleType')?.value;
        const wheelerType = this.entryDetailsForm.get('wheelerType')?.value;
        const entryDate = this.entryDetailsForm.get('entryDate')?.value;
        const entryTime = this.entryDetailsForm.get('entryTime')?.value;
        const custID = this.entryDetailsForm.get('custID')?.value;
        const slotID = this.entryDetailsForm.get('slotID')?.value;

        const entryDetailsRec: EntryDetails = new EntryDetails(vehicleType, wheelerType, vehicleNumber,entryDate, entryTime, custID, slotID);

        this.db.insertDetails(entryDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle entry logged successfully!', 'success');
            console.log('INSERT SUCCESSFUL', data);
            this.entryDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => {
            console.log('INSERT COMPLETE');
          }
        });
      } else {
        this.showAlert('Vehicle number is already registered.', 'danger');
      }
    });
  }

  showAlert(message: string, type: string) {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    if (alertPlaceholder) {
      alertPlaceholder.innerHTML = '';
      const wrapper = document.createElement('div');
      wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          <div>${message}</div>
        </div>
      `;
      alertPlaceholder.appendChild(wrapper);

      if (type === 'success' || type === 'danger') {
        const alert = new bootstrap.Alert(wrapper.querySelector('.alert'));
        setTimeout(() => {
          alert.close();
        }, 3000);
      }
    }
  }

  get vehicleType() {
    return this.entryDetailsForm.get('vehicleType');
  }
  get wheelerType() {
    return this.entryDetailsForm.get('wheelerType');
  }
  get vehicleNumber() {
    return this.entryDetailsForm.get('vehicleNumber');
  }
  get entryDate(){
    return this.entryDetailsForm.get('entryDate');
  }
  get entryTime() {
    return this.entryDetailsForm.get('entryTime');
  }
  get custID() {
    return this.entryDetailsForm.get('custID');
  }
  get slotID() {
    return this.entryDetailsForm.get('slotID');
  }

  goToHome(): void {
    this.router.navigate(['/StaffHome']);
  }
}
