/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import  EntryDetails  from './EntryDetails';
import ExitDetails from './ExitDetails';
@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private rest : HttpClient) {}
  strEntryUrl : string = "http://localhost:3000/EntryDetails";
  strExitUrl : string = "http://localhost:3000/ExitDetails";

  //To insert the entry details of the vehicle
  insertDetails(entryObj : EntryDetails) : Observable<any>{
    return this.rest.post(this.strEntryUrl, entryObj);
  }

  insertExitDetails(exitObj : ExitDetails) : Observable<any>{
    return this.rest.post(this.strExitUrl,exitObj);
  }

  getEntryDetails():Observable<any>{
    return this.rest.get(this.strEntryUrl);
  }
  
  getExitDetails():Observable<any>{
    return this.rest.get(this.strExitUrl);
  }

  checkVehicleNumber(vehicleNumber : string) : Observable<boolean>{
    return this.rest.get<EntryDetails[]>(this.strEntryUrl).pipe(
      map(entries => entries.some(entry => entry.vehicleNumber === vehicleNumber))
    );
  }
}




import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import EntryDetails from './EntryDetails';
import ExitDetails from './ExitDetails';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private rest: HttpClient) {}
  strEntryUrl: string = "http://localhost:3000/EntryDetails";
  strExitUrl: string = "http://localhost:3000/ExitDetails";

  // To insert the entry details of the vehicle
  insertDetails(entryObj: EntryDetails): Observable<any> {
    return this.rest.post(this.strEntryUrl, entryObj);
  }

  insertExitDetails(exitObj: ExitDetails): Observable<any> {
    return this.rest.post(this.strExitUrl, exitObj);
  }

  getEntryDetails(): Observable<any> {
    return this.rest.get(this.strEntryUrl);
  }
  
  getExitDetails(): Observable<any> {
    return this.rest.get(this.strExitUrl);
  }

  // New method to check if a vehicle number already exists
  checkVehicleNumberExists(vehicleNumber: string): Observable<boolean> {
    return this.rest.get<EntryDetails[]>(this.strEntryUrl).pipe(
      map(entries => entries.some(entry => entry.vehicleNumber === vehicleNumber))
    );
  }
}
*/

/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import EntryDetails from './EntryDetails';
import ExitDetails from './ExitDetails';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private rest: HttpClient) {}
  strEntryUrl: string = "http://localhost:3000/EntryDetails";
  strExitUrl: string = "http://localhost:3000/ExitDetails";

  insertDetails(entryObj: EntryDetails): Observable<any> {
    return this.rest.post(this.strEntryUrl, entryObj);
  }

  insertExitDetails(exitObj: ExitDetails): Observable<any> {
    return this.rest.post(this.strExitUrl, exitObj);
  }

  getEntryDetails(): Observable<any> {
    return this.rest.get(this.strEntryUrl);
  }

  getExitDetails(): Observable<any> {
    return this.rest.get(this.strExitUrl);
  }

  // A single method to check for a vehicle in both entry and exit records.
  checkVehicleNumberExists(vehicleNumber: string): Observable<{ entryExists: boolean; exitExists: boolean }> {
    const entryCheck$ = this.rest.get<EntryDetails[]>(this.strEntryUrl).pipe(
      map(entries => entries.some(entry => entry.vehicleNumber === vehicleNumber))
    );
    const exitCheck$ = this.rest.get<ExitDetails[]>(this.strExitUrl).pipe(
      map(exits => exits.some(exit => exit.vehicleNumber === vehicleNumber))
    );

    return forkJoin({
      entryExists: entryCheck$,
      exitExists: exitCheck$
    });
  }
}*/




/*import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import EntryDetails from './EntryDetails';
import ExitDetails from './ExitDetails';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private rest: HttpClient) {}
  strEntryUrl: string = "http://localhost:3000/EntryDetails";
  strExitUrl: string = "http://localhost:3000/ExitDetails";

  insertDetails(entryObj: EntryDetails): Observable<any> {
    return this.rest.post(this.strEntryUrl, entryObj);
  }

  insertExitDetails(exitObj: ExitDetails): Observable<any> {
    return this.rest.post(this.strExitUrl, exitObj);
  }

  getEntryDetails(): Observable<any> {
    return this.rest.get(this.strEntryUrl);
  }

  getExitDetails(): Observable<any> {
    return this.rest.get(this.strExitUrl);
  }

  // New method to check for a currently parked vehicle
  getCurrentlyParkedVehicle(vehicleNumber: string): Observable<EntryDetails | undefined> {
    return forkJoin({
      entries: this.rest.get<EntryDetails[]>(this.strEntryUrl),
      exits: this.rest.get<ExitDetails[]>(this.strExitUrl)
    }).pipe(
      map(data => {
        const lastEntry = data.entries
          .filter(entry => entry.vehicleNumber === vehicleNumber)
          .sort((a, b) => new Date(b.entryTime).getTime() - new Date(a.entryTime).getTime())[0];

        if (lastEntry) {
          const hasExited = data.exits.some(exit => exit.vehicleNumber === vehicleNumber && exit.slotID === lastEntry.slotID);
          return hasExited ? undefined : lastEntry;
        }
        return undefined;
      })
    );
  }
}*/



import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin } from 'rxjs';
import EntryDetails from './EntryDetails';
import ExitDetails from './ExitDetails';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private rest: HttpClient) {}
  strEntryUrl: string = "http://localhost:3000/EntryDetails";
  strExitUrl: string = "http://localhost:3000/ExitDetails";

  insertDetails(entryObj: EntryDetails): Observable<any> {
    return this.rest.post(this.strEntryUrl, entryObj);
  }

  insertExitDetails(exitObj: ExitDetails): Observable<any> {
    return this.rest.post(this.strExitUrl, exitObj);
  }

  getEntryDetails(): Observable<any> {
    return this.rest.get(this.strEntryUrl);
  }

  getExitDetails(): Observable<any> {
    return this.rest.get(this.strExitUrl);
  }

  // New method to get the count of a vehicle in both entry and exit databases.
  getVehicleCounts(vehicleNumber: string): Observable<{ entryCount: number; exitCount: number }> {
    const entryCount$ = this.rest.get<EntryDetails[]>(this.strEntryUrl).pipe(
      map(entries => entries.filter(entry => entry.vehicleNumber === vehicleNumber).length)
    );
    const exitCount$ = this.rest.get<ExitDetails[]>(this.strExitUrl).pipe(
      map(exits => exits.filter(exit => exit.vehicleNumber === vehicleNumber).length)
    );

    return forkJoin({
      entryCount: entryCount$,
      exitCount: exitCount$
    });
  }
}