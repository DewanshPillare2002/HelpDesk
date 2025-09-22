import { Component } from '@angular/core';
import { RestServiceService } from '../rest-service.service';
import Staff from '../staffListInterface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-staff',
  standalone: false,
  templateUrl: './manage-staff.component.html',
  styleUrl: './manage-staff.component.css'
})
export class ManageStaffComponent {
  editForm !: FormGroup;
  addForm !: FormGroup;
  constructor(private restServiceObj : RestServiceService, private fb : FormBuilder){
    this.editForm = this.fb.group({
      staffId : ['', Validators.required],
      name : ['', Validators.required],
      role : ['Staff', Validators.required],
      phoneNo : ['', [Validators.required, Validators.minLength(10)]],
      aadhaar : ['', [Validators.required, Validators.minLength(12)]]
    });
    this.addForm = this.fb.group({
      staffId : ['', Validators.required],
      name : ['', Validators.required],
      role : ['Staff', Validators.required],
      phoneNo : ['', [Validators.required, Validators.minLength(10)]],
      aadhaar : ['', [Validators.required, Validators.minLength(12)]],
    })
  }
  staffList !: Staff[];
  ngOnInit(){
    this.restServiceObj.provideStaffData().subscribe({
      next : (data) => {this.staffList = data},
      error : (err) => {alert(JSON.stringify(err))},
      complete : () => {console.log('Done')}
    });
  }
  staffId !: string;
  name !: string;
  role !: string;
  phoneNo !: string;
  aadhaar !: string;
  id !: string;
  displayDetails : boolean = false;

  getName(){
    return this.editForm.get('name');
  }
  getPhoneNo(){
    return this.editForm.get('phoneNo');
  }
  getAadhaar(){
    return this.editForm.get('aadhaar');
  }

  getNameA(){
    return this.addForm.get('name');
  }
  getPhoneNoA(){
    return this.addForm.get('phoneNo');
  }
  getAadhaarA(){
    return this.addForm.get('aadhaar');
  }

  closeButtonClicked(){
    this.editButtonBool = false;
  }
  closeButtonClickedA(){
    this.addButtonBool = false;
  }

  displayStaffMemberDetails(staffMember : Staff){
    this.staffId = staffMember.staffId;
    this.role = staffMember.role;
    this.name = staffMember.name;
    this.phoneNo = staffMember.phoneNo;
    this.aadhaar = staffMember.aadhaar;
    this.id = staffMember.id;
    this.displayDetails = !this.displayDetails;
  }
  editButtonBool : boolean = false;
  editButtonClicked(){
    this.editButtonBool = true;

    this.editForm.patchValue({
      staffId : this.staffId,
      name : this.name,
      role : this.role,
      phoneNo : this.phoneNo,
      aadhaar : this.aadhaar,
    })
  }
  editInBackend(){
    this.editButtonBool = false;
    this.displayDetails = false;
    let staffId = this.editForm.get(['staffId'])?.value;
    let name = this.editForm.get(['name'])?.value;
    let role = this.editForm.get(['role'])?.value;
    let phoneNo = this.editForm.get(['phoneNo'])?.value;
    let aadhaar = this.editForm.get(['aadhaar'])?.value;
    let id = this.id;

    let staffObj : Staff = new Staff(staffId, name, role, phoneNo, aadhaar, id);
    this.restServiceObj.editStaffMemberDetailsInBackend(staffObj).subscribe({
      next : (data) => {this.staffList = data, this.ngOnInit()},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('complete'),
    })
  }
  
  addButtonBool : boolean = false;
  addButtonClicked(){
    this.addButtonBool = true;
  }
  addInBackend(){
    this.addButtonBool = false;
    this.displayDetails = false;
    let staffId = this.addForm.get(['staffId'])?.value;
    let name = this.addForm.get(['name'])?.value;
    let role = this.addForm.get(['role'])?.value;
    let phoneNo = this.addForm.get(['phoneNo'])?.value;
    let aadhaar = this.addForm.get(['aadhaar'])?.value;
    let id : string = '';

    let addStaffObj : Staff = new Staff(staffId, name, role, phoneNo, aadhaar, id);
    this.restServiceObj.addStaffMemberDetailsInBackend(addStaffObj).subscribe({
      next : (data) => {this.staffList = data, this.ngOnInit()},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done')
    })
  }

  deleteButtonBool : boolean = false;
  deleteButtonClicked(){
    this.restServiceObj.deleteStaff(this.id).subscribe({
      next : (data) => {this.ngOnInit()},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done'),
    })
  }
}
