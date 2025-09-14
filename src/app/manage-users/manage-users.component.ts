import { Component } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import { Users } from '../usersListInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  editForm !: FormGroup;
  constructor(private restServiceObj : RestServiceService, private fb : FormBuilder){
    this.editForm = this.fb.group({
      userId : ['', Validators.required],
      userName : ['', Validators.required],
      role : ['', Validators.required],
      subscription : ['', Validators.required],
      email : ['', [Validators.required, Validators.email]],
      userAadhaar : ['', [Validators.required, Validators.minLength(12)]],
      userPhoneNo : ['', [Validators.required, Validators.minLength(10)]]
    })
  }
  usersList! : Users[];
  ngOnInit(){
    this.restServiceObj.provideUsersData().subscribe({
      next : (data) => {this.usersList = data},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log("done")
    })
  }

  closeButtonClicked(){
    this.editButtonBool = false;
  }

  userId !: string;
  userName !: string;
  role !: string;
  subscription !: string;
  email !: string;
  userAadhaar !: string;
  userPhoneNo !: string;
  id !: string;
  displayDetails : boolean = false;
  displayUserDetails(user : Users){
    this.userId = user.userId;
    this.userName = user.userName;
    this.role = user.role;
    this.subscription = user.subscription;
    this.email = user.email;
    this.userAadhaar = user.userAadhaar;
    this.userPhoneNo = user.userPhoneNo;
    this.id = user.id;
    this.displayDetails = !this.displayDetails;
  }
  editButtonBool : boolean = false;
  editButtonClicked(){
    this.editButtonBool = true;
    this.editForm.patchValue({
      userId : this.userId,
      userName : this.userName,
      role : this.role,
      subscription : this.subscription,
      email : this.email,
      userAadhaar : this.userAadhaar,
      userPhoneNo : this.userPhoneNo
    })
  }
  editInBackend(){
    this.editButtonBool = false;
    this.displayDetails = false;
    let userId = this.editForm.get(['userId'])?.value;
    let name = this.editForm.get(['userName'])?.value;
    let role = this.editForm.get(['role'])?.value;
    let subscription = this.editForm.get(['subscription'])?.value;
    let email = this.editForm.get(['email'])?.value;
    let aadhaar = this.editForm.get(['userAadhaar'])?.value;
    let phoneNo = this.editForm.get(['userPhoneNo'])?.value;
    let id = this.id;

    let editUserDataObj : Users = new Users(userId, name, role, subscription, email, aadhaar, phoneNo, id);

    this.restServiceObj.editUserDetailsInBackend(editUserDataObj).subscribe({
      next : (data) => {this.usersList = data, this.ngOnInit()},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done')
    })
  }

  getName(){
    return this.editForm.get(['userName']);
  }
  getEmail(){
    return this.editForm.get(['email']);
  }
  getAadhaar(){
    return this.editForm.get(['userAadhaar']);
  }
  getPhoneNo(){
    return this.editForm.get(['userPhoneNo']);
  }

  deleteButtonBool : boolean = false;
  deleteButtonClicked(){
    this.restServiceObj.deleteUser(this.id).subscribe({
      next : (data) => {this.ngOnInit()},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done'),
    })
  }
}
