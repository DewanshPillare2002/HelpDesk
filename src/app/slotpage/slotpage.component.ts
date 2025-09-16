import { Component,OnInit } from '@angular/core';
import slotmodule from './slotmodule';
import { SlotBookingRestService } from '../slotBookingRest.service';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-slotpage',
  standalone: false,
  templateUrl: './slotpage.component.html',
  styleUrl: './slotpage.component.css'
})
export class SlotpageComponent implements OnInit{
  selectedDate:string='';
  slotLst!:slotmodule[];
  slotNumber:string='';
  entireSlot:slotmodule[]=[];
  selectedSlot:HTMLButtonElement | null=null;
  constructor(private restService:SlotBookingRestService, private router : Router, private paymentAPI : PaymentService){}
  //Dynamic Calendar
  mindate!:string;
  maxdate!:string;
  ngOnInit():void{
     const today=new Date();
     this.mindate=this.formatDate(today);     
     const monthAfter=new Date();
     monthAfter.setMonth(monthAfter.getMonth()+1);
     this.maxdate=this.formatDate(monthAfter);
     const dateFixing=document.getElementById('calendar') as HTMLInputElement;
     if(dateFixing){
         dateFixing.min=this.mindate;
         dateFixing.max=this.maxdate;
     }
  }
  goToHelpPage() {
    this.router.navigate(['/help&support']); 
  }
  private formatDate(date:Date):string{
    var year=date.getFullYear();
    var month=String(date.getMonth()+1).padStart(2,'0');
    var _date=String(date.getDate()).padStart(2,'0');
    return `${year}-${month}-${_date}`;
  }
  
  //this function is used to show the slot based upon user clicks
  parkinglayout!: boolean;
  buttonArr: any;
   showNormalSlots(){
    // to check whether date is choosen or not
    if(this.selectedDate==''){
      return alert('Please Enter The Date');
    }
       this.parkinglayout=true;
   }
   showEVSlots(){
    // to check whether date is choosen or not
    if(this.selectedDate==''){
      return alert('Please Enter The Date');
    }
       this.parkinglayout=false;
   }

   //get the data from slot button when it is clicked
   bluebutton:string='btn btn-primary';
   parkingType:string='';
  changeBlueButton(button:HTMLButtonElement):void{
     this.slotNumber=button.id;
     this.parkingType='normalParking';     
     if(button.classList.contains('btn-secondary')){
      alert('This seat is already occupied');
      return;
     }

     if(this.selectedSlot && this.selectedSlot!==button){
       alert("choose one seat at a time");
       return;
     }
     
     if(button.classList.contains('btn-primary')){
         button.classList.remove('btn-primary');
         button.classList.add('btn-danger');
         this.selectedSlot=button;
     }
     else{
         button.classList.remove('btn-danger');
         button.classList.add('btn-primary');
         this.selectedSlot=null;
     }

  }
  changeGreenButton(button:HTMLButtonElement):void{
      this.slotNumber=button.id;
      this.parkingType='EVvehicle';
      if(button.classList.contains('btn-secondary')){
        alert("This seat is already occupied");
        return;
      }
       if(this.selectedSlot && this.selectedSlot!==button){
       alert("choose one seat at a time");
       return;
     }
      if(button.classList.contains('btn-success')){
         button.classList.remove('btn-success');
         button.classList.add('btn-danger');
         this.selectedSlot=button;
     }
     else{
         button.classList.remove('btn-danger');
         button.classList.add('btn-success');
         this.selectedSlot=null;
     }
  }

   
  //Display the data to the user which are all the slots have been occupied
  getdatafromDate():void{
     this.slotLst=[];
     this.buttonArr=[];
     this.restService.getAllData().subscribe({
      next:(data:any[])=>{
        const filteredSlots=data.filter(slot=>slot.date===this.selectedDate);
        this.slotLst=filteredSlots.map(slotid=>slotid.slot);
        this.buttonArr=this.slotLst;
        this.entireSlot=data;
        this.buttonArr.forEach((slotIdString: string)=>{
          const button=document.getElementById(slotIdString);
          if(button){
            button.classList.remove('btn-success','btn-primary');
            button.classList.add('btn-secondary');
          }
        })
      },
      error:(err)=>alert(JSON.stringify(err)),
      complete:()=>console.log('Getting Data for the selected date and type of parking is complete.')
      });
  }

  //insert the data to the json server 
  bookslot(slotId:string):void{
    const slotData:slotmodule={
      id: 0,
      slot: this.slotNumber,
      date: this.selectedDate,
      userid: '124',
      parkingType: this.parkingType
    };
    this.restService.insertData(slotData).subscribe({
      next:(response)=>{
        console.log('Slot Booking is Successful'+response);
        alert(`slotId ${this.slotNumber} has been booked`);
        this.getdatafromDate();
      },
      error:(err)=>{
        console.log('Error Booking Slot:',err);
        alert('failed to book your slot');
      }
    })
  }
    
   //delete the json data once vehicles need to be exit 
  //  deleteSlot(slotToDelete:string,dateToDelete:string):void{
  //   const recordToDelete=this.entireSlot.find(
  //     (slot)=>slot.slot===slotToDelete && slot.date===dateToDelete
  //   );
  //   console.log(recordToDelete);
  //   if(recordToDelete){
  //     this.restService.deleteRecord(recordToDelete.id).subscribe({
  //         next:()=>{
  //           alert('Slot Deleted Successfully!');
  //           this.getdatafromDate();
  //         },
  //         error:(err)=>{
  //           console.error('Error deleting slot:',err);
  //           alert('Failed to delete slot.');
  //         },
  //         complete:()=>{console.log("Deletion is successful");}
  //     });
  //   }
  //  }
 
  
  
  //checkout to payment
  PaymentCheckout(){
   const subObj={
      userId : 'U001',
      slot : this.slotNumber,
      period : this.parkingType,
      date : this.selectedDate,
      amount : 80,
      status : 'pending'
    } 
  this.paymentAPI.createPayment('parkingPayments', subObj).subscribe(newSub=>{
    this.router.navigate(['checkout'],
      { queryParams : {id: newSub.id, type: 'parkingPayments'}});
  });

  
}

  
}



