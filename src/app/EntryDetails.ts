export default class EntryDetails{
    vehicleType! : string;
    wheelerType! : string;
    vehicleNumber! : string;
    entryDate! : string;
    entryTime! : string;
    custID! : string;
    slotID! : string;


    constructor(vehicleType : string, wheelerType : string, vehicleNumber : string,entryDate: string, entryTime : string, custID : string, slotID : string)
    {
        this.vehicleType = vehicleType;
        this.wheelerType = wheelerType;
        this.vehicleNumber = vehicleNumber;
        this.entryDate = entryDate;
        this.entryTime = entryTime;
        this.custID = custID;
        this.slotID = slotID;
    }
}