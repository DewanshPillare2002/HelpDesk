export default class User{
    name!: string;
    email!: string;
    aadhar!: number;
    password!: string;
    role!: string;
    member! : boolean;

    constructor(name : string,email:string,aadhar:number,password:string,role:string,member:boolean){
        this.name=name;
        this.email=email;
        this.aadhar=aadhar;
        this.password=password;
        this.role=role;
        this.member = member;

    }
}