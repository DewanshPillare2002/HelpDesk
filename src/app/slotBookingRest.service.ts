import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  insertData(slotObj:slotmodule):Observable<any>{
     return this.rest.post(this.strUrl,slotObj);
  }
   deleteRecord(slotId: string | number): Observable<any>{
    const url=`${this.strUrl}/${slotId}`;
    return this.rest.delete(url);
   
  }
}
