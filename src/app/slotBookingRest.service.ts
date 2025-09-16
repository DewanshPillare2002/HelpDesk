import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import slotmodule from './slotpage/slotmodule';

@Injectable({
  providedIn: 'root'
})
export class SlotBookingRestService {

  constructor(private rest:HttpClient) { }
  strUrl:string="http://localhost:3000/slotmodule";
  getAllData():Observable<any>{
    return this.rest.get(this.strUrl);
  }
  insertData(slotObj:any):Observable<any>{
     return this.rest.post(this.strUrl,slotObj);
  }
  //  deleteRecord(slotId: string | number): Observable<any>{
  //   const url=`${this.strUrl}/${slotId}`;
  //   return this.rest.delete(url);
   
  // }
  deleteRecord(slotToDelete:string,datetoDelete:string,entireSlot:any[]):Observable<any>{
   
    const recordToDelete=entireSlot.find(
      (slot)=>slot.slot===slotToDelete && slot.date===datetoDelete
    );
     const url=`${this.strUrl}/${recordToDelete.id}`;
    if(recordToDelete){
      return this.rest.delete(url);
    }
    else{
      return throwError(()=>new Error('Record not found'));
    }
  }
}
