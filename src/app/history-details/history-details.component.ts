/*
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs';



@Component({
  selector: 'app-history-details',
  standalone: false,
  templateUrl: './history-details.component.html',
  styleUrl: './history-details.component.css'
})
export class HistoryDetailsComponent {

  historyDetailsForm!: FormGroup;
  bHistory: boolean = true;
  historyRecords: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private dbService: DbServiceService) {
    this.historyDetailsForm = this.fb.group({
      exitDate: ['', [Validators.required]]
    });
  }
  get exitDate() {
    return this.historyDetailsForm.get(['exitDate']);
  }

  HistoryForm(): void {
    if (this.historyDetailsForm.invalid) {
      return;
    }
    let exitDate = this.historyDetailsForm.get(['exitDate'])?.value;
    /*forkJoin([
      this.dbService.getEntryDetails(),
      this.dbService.getExitDetails()
    ]).subscribe(([entryRecords, exitRecords]) => {
      const filteredEntries = entryRecords.filter((rec: any) => rec.vehicleNumber === vehicleNumber);
      this.historyRecords = filteredEntries.map((entry: any) => {
        const matchingExit = exitRecords.find((exit: any) => exit.vehicleNumber === vehicleNumber);
        return {
          ...entry,
          exitTime: matchingExit ? matchingExit.exitTime : 'null',
          exitDate: matchingExit ? matchingExit.exitDate : 'null'
        };
      });
      this.bHistory = false;
    });
    forkJoin([
      this.dbService.getEntryDetails(),
      this.dbService.getExitDetails()
    ]).pipe(
      map(([entryRecords, exitRecords]) => {
        const filteredExits = exitRecords.filter((rec: any) => rec.exitDate === exitDate);
        return filteredExits.map((exit: any) => {
          const matchingEntry = entryRecords.find((entry: any) => entry.vehicleNumber === exit.vehicleNumber);
          return {
            ...exit,
            ...matchingEntry
          };
        });
      })
    ).subscribe(historyRecords => {
      this.historyRecords = historyRecords;
      this.bHistory = false;
    });
  }


  goToSearch() {
    this.bHistory = true;
    this.historyDetailsForm.reset();
    this.historyRecords = [];
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}*/

/*
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import EntryDetails from '../EntryDetails';
import ExitDetails from '../ExitDetails';

@Component({
  selector: 'app-history-details',
  standalone: false,
  templateUrl: './history-details.component.html',
  styleUrl: './history-details.component.css'
})
export class HistoryDetailsComponent {

  historyDetailsForm!: FormGroup;
  bHistory: boolean = true;
  historyRecords: any[] = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private dbService: DbServiceService) {
    this.historyDetailsForm = this.fb.group({
      exitDate: ['', [Validators.required]]
    });
  }
  
  get exitDate() {
    return this.historyDetailsForm.get(['exitDate']);
  }

  HistoryForm(): void {
    if (this.historyDetailsForm.invalid) {
      return;
    }
    const exitDate = this.historyDetailsForm.get(['exitDate'])?.value;

    forkJoin([
      this.dbService.getEntryDetails(),
      this.dbService.getExitDetails()
    ]).pipe(
      map(([entryRecords, exitRecords]) => {
        // Filter exit records by the selected exit date
        const filteredExits = exitRecords.filter((exit: ExitDetails) => exit.exitDate === exitDate);
        
        // Map each filtered exit record to a combined history record
        return filteredExits.map((exit: ExitDetails) => {
          // Find the most recent matching entry record for the vehicle
          const matchingEntry = entryRecords
            .filter((entry: EntryDetails) => entry.vehicleNumber === exit.vehicleNumber)
            .sort((a: EntryDetails, b: EntryDetails) => new Date(a.entryTime).getTime() - new Date(b.entryTime).getTime())
            .pop();
          
          // Return the merged record for display
          return {
            ...exit,
            ...matchingEntry
          };
        });
      })
    ).subscribe(historyRecords => {
      this.historyRecords = historyRecords;
      this.bHistory = false;
    });
  }

  goToSearch() {
    this.bHistory = true;
    this.historyDetailsForm.reset();
    this.historyRecords = [];
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
*/

/*
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import EntryDetails from '../EntryDetails';
import ExitDetails from '../ExitDetails';

@Component({
  selector: 'app-history-details',
  standalone: false,
  templateUrl: './history-details.component.html',
  styleUrl: './history-details.component.css'
})
export class HistoryDetailsComponent {

  historyDetailsForm!: FormGroup;
  bHistory: boolean = true;
  historyRecords: any[] = [];
  entryRecords: EntryDetails[] = [];
  exitRecords: ExitDetails[] = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private dbService: DbServiceService) {
    this.historyDetailsForm = this.fb.group({
      exitDate: ['', [Validators.required]]
    });
  }
 
  get exitDate() {
    return this.historyDetailsForm.get(['exitDate']);
  }

  HistoryForm(): void {
    if (this.historyDetailsForm.invalid) {
      return;
    }
    const exitDate = this.historyDetailsForm.get(['exitDate'])?.value;

    forkJoin([
      this.dbService.getEntryDetails(),
      this.dbService.getExitDetails()
    ]).subscribe(([entryData, exitData]) => {
      // Filter exit records by the selected exit date
      const filteredExits = (exitData as ExitDetails[]).filter((exit: ExitDetails) => exit.exitDate === exitDate);
     
      // Clear previous records
      this.entryRecords = [];
      this.exitRecords = [];

      filteredExits.forEach(exit => {
        // Find the corresponding entry record for this exit
        const correspondingEntry = (entryData as EntryDetails[]).find(entry => entry.vehicleNumber === exit.vehicleNumber);
       
        if (correspondingEntry) {
          // Add the entry and exit records to their respective arrays
          this.entryRecords.push(correspondingEntry);
          this.exitRecords.push(exit);
        }
      });

      this.bHistory = false;
    });
  }

  goToSearch() {
    this.bHistory = true;
    this.historyDetailsForm.reset();
    this.entryRecords = [];
    this.exitRecords = [];
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}

*/


import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DbServiceService } from '../db-service.service';
import { forkJoin } from 'rxjs';
import EntryDetails from '../EntryDetails';
import ExitDetails from '../ExitDetails';

@Component({
  selector: 'app-history-details',
  standalone: false,
  templateUrl: './history-details.component.html',
  styleUrl: './history-details.component.css'
})
export class HistoryDetailsComponent {

  historyDetailsForm!: FormGroup;
  bHistory: boolean = true;
  entryRecords: EntryDetails[] = [];
  exitRecords: ExitDetails[] = [];

  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient, private dbService: DbServiceService) {
    this.historyDetailsForm = this.fb.group({
      exitDate: ['', [Validators.required]]
    });
  }

  get exitDate() {
    return this.historyDetailsForm.get(['exitDate']);
  }

  HistoryForm(): void {
    if (this.historyDetailsForm.invalid) {
      return;
    }
    const exitDate = this.historyDetailsForm.get(['exitDate'])?.value;

    forkJoin([
      this.dbService.getEntryDetails(),
      this.dbService.getExitDetails()
    ]).subscribe(([entryData, exitData]) => {

      this.entryRecords = (entryData as EntryDetails[]).filter(exit => exit.entryDate === exitDate);

      // Filter exit records by the selected exit date
      this.exitRecords = (exitData as ExitDetails[]).filter(exit => exit.exitDate === exitDate);

      this.bHistory = false;
    });
  }

  goToSearch() {
    this.bHistory = true;
    this.historyDetailsForm.reset();
    this.entryRecords = [];
    this.exitRecords = [];
  }

  goToHome() {
    this.router.navigate(['/StaffHome']);
  }
}
