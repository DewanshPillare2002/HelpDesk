export class Users{
    userId !: string;
    userName !: string;
    role !: string;
    subscription !: string;
    email !: string;
    userAadhaar !: string;
    userPhoneNo !: string;
    id !: string;
    constructor(userId:string, name:string, role:string, subscription:string, email:string,aadhaar:string,phoneNo:string, id:string){
        this.userId = userId;
        this.userName = name;
        this.role = role;
        this.subscription = subscription;
        this.email = email;
        this.userAadhaar = aadhaar;
        this.userPhoneNo = phoneNo;
        this.id = id;
    }
}