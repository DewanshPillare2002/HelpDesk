import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { feedbackInterface } from '../feedbackInterface';
import { RestServiceService } from '../rest-service.service';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-main-screen-body',
  standalone: false,
  templateUrl: './main-screen-body.component.html',
  styleUrl: './main-screen-body.component.css',
})
export class MainScreenBodyComponent {
  constructor(private shareDataObj : ShareDataService, private route : Router, private restServiceObj : RestServiceService){  }
  clicked : boolean = false;
  feedbacks! : feedbackInterface[];
  ngOnInit(){
    this.shareDataObj.currentFlagValue.subscribe(input => this.clicked = input);
    this.restServiceObj.provideFeedback().subscribe({
      next : (data) => {this.feedbacks = data},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done'),
    })
  }
  displayUsersDataComp(){
    this.route.navigate(['/manageUsers']);
  }
  displayStaffDataComp(){
    this.route.navigate(['/manageStaff']);
  }
  logoutFunctionFromAdmin(){
    this.route.navigate(['']);
  }
}
