//ORIGINAL FILE

/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import ExitDetails from '../ExitDetails';

@Component({
  selector: 'app-exit-details',
  standalone: false,
  templateUrl: './exit-details.component.html',
  styleUrl: './exit-details.component.css'
})
export class ExitDetailsComponent {
  title= 'Exit Details';

  exitDetailsForm! : FormGroup;
  exitDetailsList! : ExitDetails[];
  constructor(private router : Router,private fb : FormBuilder, private db : DbServiceService)
  {
    this.exitDetailsForm = this.fb.group({
      vehicleNumber : ['',Validators.required,Validators.maxLength(13)],
      slotID : ['',Validators.required,Validators.maxLength(4)],
      exitDate : ['',Validators.required],
      exitTime : ['',Validators.required]
    });

    /*this.exitDetailsForm = this.fb.group({
      vehicleNumber : [''],
      exitTime : [''],
      slotID : ['']
    })
  }
  

  //Value from Reactive Exit Details Form

  ExitForm():void
  {
      if(this.exitDetailsForm.invalid){
        alert('Please fill out all required fields correctly.')
        this.exitDetailsForm.markAllAsTouched();
        return;
      }
      let vehicleNumber = this.exitDetailsForm.get(['vehicleNumber'])?.value;
      let slotID = this.exitDetailsForm.get(['slotID'])?.value;
      let exitTime = this.exitDetailsForm.get(['exitTime'])?.value;
      let exitDate = this.exitDetailsForm.get(['exitDate'])?.value;

      let exitDetailsRec : ExitDetails = new ExitDetails(vehicleNumber,slotID,exitDate,exitTime);

      //Call the service with this data to insert record into json

      this.db.insertExitDetails(exitDetailsRec).subscribe({
        next : (data) => {},
        error : (err) => alert(JSON.stringify(err)),
        complete : () => console.log('EXIT DETAILS INSERTION SUCCESSFUL')
      })

      this.exitDetailsForm.reset({
        vehicleNumber:'',
        slotID:'',
        exitDate: '',
        exitTime:''
      });

  }

  get vehicleNumber()
  {
    return this.exitDetailsForm.get(['vehicleNumber']);
  }
  get exitTime(){
    return this.exitDetailsForm.get(['exitTime']);
  }
  get slotID(){
    return this.exitDetailsForm.get(['slotID']);
  }
  get exitDate(){
    return this.exitDetailsForm.get(['exitDate']);
  }


  goToHome(){
    this.router.navigate(['/home']);
  }
}
  */


/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import ExitDetails from '../ExitDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-exit-details',
  standalone: false,
  templateUrl: './exit-details.component.html',
  styleUrl: './exit-details.component.css'
})
export class ExitDetailsComponent {
  title = 'Exit Details';
  exitDetailsForm!: FormGroup;
  exitDetailsList!: ExitDetails[];

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.exitDetailsForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.maxLength(13)]],
      slotID: ['', [Validators.required, Validators.maxLength(4)]],
      exitDate: ['', Validators.required],
      exitTime: ['', Validators.required]
    });
  }

  ExitForm(): void {
    if (this.exitDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly.', 'danger');
      this.exitDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.exitDetailsForm.get('vehicleNumber')?.value;

    this.db.checkVehicleNumberExists(vehicleNumber).subscribe(({ entryExists, exitExists }) => {
      // Condition: Not found in EntryDetails OR already found in ExitDetails
      if (!entryExists || exitExists) {
        this.showAlert('Vehicle not found or has already exited.', 'danger');
      } else {
        const slotID = this.exitDetailsForm.get('slotID')?.value;
        const exitTime = this.exitDetailsForm.get('exitTime')?.value;
        const exitDate = this.exitDetailsForm.get('exitDate')?.value;

        const exitDetailsRec: ExitDetails = new ExitDetails(vehicleNumber, slotID, exitDate, exitTime);

        this.db.insertExitDetails(exitDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle exit logged successfully!', 'success');
            console.log('EXIT DETAILS INSERTION SUCCESSFUL', data);
            this.exitDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => console.log('EXIT COMPLETE')
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

  get vehicleNumber() {
    return this.exitDetailsForm.get('vehicleNumber');
  }
  get exitTime() {
    return this.exitDetailsForm.get('exitTime');
  }
  get slotID() {
    return this.exitDetailsForm.get('slotID');
  }
  get exitDate() {
    return this.exitDetailsForm.get('exitDate');
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}*/

/*import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import ExitDetails from '../ExitDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-exit-details',
  standalone: false,
  templateUrl: './exit-details.component.html',
  styleUrl: './exit-details.component.css'
})
export class ExitDetailsComponent {
  title = 'Exit Details';
  exitDetailsForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.exitDetailsForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.maxLength(13)]],
      slotID: ['', [Validators.required, Validators.maxLength(4)]],
      exitDate: ['', Validators.required],
      exitTime: ['', Validators.required]
    });
  }

  ExitForm(): void {
    if (this.exitDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly.', 'danger');
      this.exitDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.exitDetailsForm.get('vehicleNumber')?.value;

    this.db.getCurrentlyParkedVehicle(vehicleNumber).subscribe(currentEntry => {
      if (!currentEntry) {
        this.showAlert('Vehicle not found or has already exited.', 'danger');
      } else {
        const slotID = this.exitDetailsForm.get('slotID')?.value;
        const exitTime = this.exitDetailsForm.get('exitTime')?.value;
        const exitDate = this.exitDetailsForm.get('exitDate')?.value;

        const exitDetailsRec: ExitDetails = new ExitDetails(vehicleNumber, slotID, exitDate, exitTime);

        this.db.insertExitDetails(exitDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle exit logged successfully!', 'success');
            console.log('EXIT DETAILS INSERTION SUCCESSFUL', data);
            this.exitDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => console.log('EXIT COMPLETE')
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

  get vehicleNumber() {
    return this.exitDetailsForm.get('vehicleNumber');
  }
  get exitTime() {
    return this.exitDetailsForm.get('exitTime');
  }
  get slotID() {
    return this.exitDetailsForm.get('slotID');
  }
  get exitDate() {
    return this.exitDetailsForm.get('exitDate');
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}*/

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbServiceService } from '../db-service.service';
import ExitDetails from '../ExitDetails';
declare var bootstrap: any;

@Component({
  selector: 'app-exit-details',
  standalone: false,
  templateUrl: './exit-details.component.html',
  styleUrl: './exit-details.component.css'
})
export class ExitDetailsComponent {
  title = 'Exit Details';
  exitDetailsForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private db: DbServiceService) {
    this.exitDetailsForm = this.fb.group({
      vehicleNumber: ['', [Validators.required, Validators.maxLength(10)]],
      slotID: ['', [Validators.required, Validators.maxLength(4)]],
      exitDate: ['', Validators.required],
      exitTime: ['', Validators.required]
    });
  }

  ExitForm(): void {
    if (this.exitDetailsForm.invalid) {
      this.showAlert('Please fill out all required fields correctly.', 'danger');
      this.exitDetailsForm.markAllAsTouched();
      return;
    }

    const vehicleNumber = this.exitDetailsForm.get('vehicleNumber')?.value;

    this.db.getVehicleCounts(vehicleNumber).subscribe(({ entryCount, exitCount }) => {
      // Condition: The vehicle can exit only if it has an entry without a corresponding exit.
      if (entryCount === exitCount + 1) {
        const slotID = this.exitDetailsForm.get('slotID')?.value;
        const exitTime = this.exitDetailsForm.get('exitTime')?.value;
        const exitDate = this.exitDetailsForm.get('exitDate')?.value;

        const exitDetailsRec: ExitDetails = new ExitDetails(vehicleNumber, slotID, exitDate, exitTime);

        this.db.insertExitDetails(exitDetailsRec).subscribe({
          next: (data) => {
            this.showAlert('Vehicle exit logged successfully!', 'success');
            console.log('EXIT DETAILS INSERTION SUCCESSFUL', data);
            this.exitDetailsForm.reset();
          },
          error: (err) => this.showAlert(`Error: ${JSON.stringify(err)}`, 'danger'),
          complete: () => console.log('EXIT COMPLETE')
        });
      } else {
        this.showAlert('Vehicle not found or has already exited.', 'danger');
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

  get vehicleNumber() {
    return this.exitDetailsForm.get('vehicleNumber');
  }
  get exitTime() {
    return this.exitDetailsForm.get('exitTime');
  }
  get slotID() {
    return this.exitDetailsForm.get('slotID');
  }
  get exitDate() {
    return this.exitDetailsForm.get('exitDate');
  }

  goToHome() {
    this.router.navigate(['/StaffHome']);
  }
}
