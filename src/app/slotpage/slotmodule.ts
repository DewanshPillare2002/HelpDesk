//connecting database(json server) into our slot
export default class slotmodule{
    id!:number;
    slot!:string;
    date!:string;
    userid!:string;
    parkingType!:string;

  constructor(id:number,slot:string,date:string,userid:string,parkingType:string){    
    this.id=id;
    this.slot=slot;
    this.date=date;
    this.userid=userid;
    this.parkingType=parkingType;
  }
  }