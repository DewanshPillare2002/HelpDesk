export default class ExitDetails{
    vehicleNumber! : string;
    slotID! : string;
    exitDate! : string;
    exitTime! : string;


    constructor(vehicleNumber : string, slotID : string, exitDate : string,exitTime : string)
    {
        this.vehicleNumber = vehicleNumber;
        this.slotID = slotID;
        this.exitDate = exitDate;
        this.exitTime = exitTime;
    }
}