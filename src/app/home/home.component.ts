import { Component } from '@angular/core';
import User from '../User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Rest1Service } from '../rest1.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
title = 'MyProject2';
  parkingHeroBg='/Users/parking2.jpg';

  features=[
    {icon: 'local_parking',title: 'Real Time Availability',description: 'Find parking spots instantly.'},
    {icon: 'payment',title: 'Easy Payment',description: 'Pay securely from the app.'},
    {icon: 'security',title: 'Secure',description: 'Your data is always protected.'},
    {icon: 'speed',title: 'Fast Access',description: 'Book and park in seconds.'}

  ];

  registrationForm!: FormGroup;
  showMainContent: boolean = true;
  showMainContentR: boolean = false;
  
  constructor(private fb : FormBuilder, private route : Router,private restService:Rest1Service){
   this.addOrEditForm = this.fb.group({
  name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  role: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  aadhar: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
  password: ['', [Validators.required, Validators.minLength(5)]],
  confirmPwd: ['', [Validators.required, Validators.minLength(5)]]
});
 }




  userLst!:User[];
  bDisplayInsertRecordForm:boolean=false;
  addOrEditForm!:FormGroup;
  displayAddForm(){
    
    this.addOrEditForm.reset({
      name : '',
      email : '',
      aadhar : '',
      password : '',
      role : ''
    }); 
  this.bDisplayInsertRecordForm=true;
}

/*AddDataInBackend(){
  let name= this.addOrEditForm.get(['name'])?.value;
  let email=this.addOrEditForm.get(['email'])?.value;
  let aadhar=this.addOrEditForm.get(['aadhar'])?.value;
  let password=this.addOrEditForm.get(['password'])?.value;
  let role=this.addOrEditForm.get(['role'])?.value;


  let userRec: User = new User(name,email,aadhar,password,role);
  
  this.restService.insertData(userRec).subscribe({
    next:(data: any) => {alert('Registration succesful'); this.getDataFromService();},
    error : (err: any) => alert(JSON.stringify(err)),
    complete : () => console.log('Insert operation is succesful')
  })
 this.bDisplayInsertRecordForm=false;

}
getDataFromService(){
    this.restService.getAllData().subscribe({
      next:(data: User[]) => {this.userLst = data;},
      error : (err: any) => alert(JSON.stringify(err)),
      complete : () => console.log('Getting the data from backend is complete')
    })
  }

  getname(){
  return this.addOrEditForm.get(['name']);
}
 getemail(){
  return this.addOrEditForm.get(['email']);
}
 getaadhar(){
  return this.addOrEditForm.get(['aadhar']);
}
  
  getpassword(){
  return this.addOrEditForm.get(['password']);
}


   RegisterTheForm() {
  let name = this.addOrEditForm.get('name')?.value;
  let email = this.addOrEditForm.get('email')?.value;
  let aadhar = this.addOrEditForm.get('aadhar')?.value;
  let password = this.addOrEditForm.get('password')?.value;
   let role = this.addOrEditForm.get('role')?.value;

  if (!name || !password || !email || !aadhar || !role) {
    alert('Please fill in all the fields.');
    return;
  }
  

 
    
}
*/


    

GoToRegisterPage(){
 this.showMainContentR = true;
  this.route.navigate(['/register']);
}







    GoToLoginPage() {
  this.showMainContent = false;
  this.route.navigate(['/login']);
    } 
}
