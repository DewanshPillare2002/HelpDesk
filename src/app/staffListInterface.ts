export default class Staff{
    staffId !: string;
    name !: string;
    role !: string;
    phoneNo !: string;
    aadhaar !: string;
    id !: string;
    constructor(staffId : string, name : string, role : string, phoneNo : string, aadhaar : string, id : string){
        this.staffId = staffId,
        this.name = name;
        this.role = role;
        this.phoneNo = phoneNo;
        this.aadhaar = aadhaar;
        this.id = id;
    }
}