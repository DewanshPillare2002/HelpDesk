import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '../User';
import { Rest1Service } from '../rest1.service';
import { ShareData1Service } from '../share-data1.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userLst: any;
message: string = '';


  
  constructor(private fb : FormBuilder, private route : Router,private restService:Rest1Service, private shareDataService : ShareData1Service){
   this.addOrEditForm = this.fb.group({
  name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  role: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  aadhar: ['', [Validators.required, Validators.pattern(/^\d{12}$/)]],
  password: ['', [Validators.required, Validators.minLength(5)]],
  confirmPwd: ['', [Validators.required, Validators.minLength(5)]]
});
 }



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

AddDataInBackend(){
   



  let name= this.addOrEditForm.get(['name'])?.value;
  let email=this.addOrEditForm.get(['email'])?.value;
  let aadhar=this.addOrEditForm.get(['aadhar'])?.value;
  let password=this.addOrEditForm.get(['password'])?.value;
  let role=this.addOrEditForm.get(['role'])?.value;
  let member = false;


  let userRec: User = new User(name,email,aadhar,password,role,member);
  
  this.restService.insertData(userRec).subscribe({
    next:(data: any) => {alert('Registration successful'); this.getDataFromService();},
    error : (err: any) => alert(JSON.stringify(err)),
    complete : () => console.log('Insert operation is successful')
  })
 this.bDisplayInsertRecordForm=false;



}

  getDataFromService(){
    this.restService.getAllData().subscribe({
      next:(data: any) => {this.userLst = data;},
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


}
