import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedbackService } from '../feedback.service';
import Feedback from './feedback' // this syntax because the class is default.
// the import with curly braces are called named export. You can export multiple things (classes, functions, variables) from a single module.
// The import without curly brace is called default export. we can export only one module in this.

@Component({
  selector: 'app-feedback',
  standalone: false,
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css'
})

export class FeedbackComponent {
  uid! : number;
  rating! : string;
  text! : string;

  feedbackForm! : FormGroup;

  constructor(private feedbackService : FeedbackService, private fb: FormBuilder){
    this.feedbackForm = this.fb.group({
      rating : ["", Validators.required],
      text : ["", Validators.required]
    })
  }

  // *************************Print the emoji on the top*********************************
  //dictionary of the emoji
    myMap = new Map<string, string>([
    ["very bad" , "😠"],
    ["bad" , "😕"],
    ["neutral" , "😐"],
    ["good" , "🙂"],
    ["very good" , "😀"]
  ]);

  // getting mapped emoji from rating
  emoji! : string;
  // get data from form
  showEmoji(){
    this.rating = this.feedbackForm.get(['rating'])!.value;
    let emojiValue = this.myMap.get(this.rating);
    // the map.get returns undefined|data type. so to handle this, we write if else part.
    if(emojiValue){
      this.emoji = emojiValue;
    }else{
      this.emoji = '';
    }
  }
  
  feedbackList! : Feedback[]; // a variable of type pojo class

  // to get data
  getDataFromService(){
    this.feedbackService.getAllData().subscribe({
      next: (data) => {this.feedbackList = data;},
      error: (err) => alert(JSON.stringify(err)),
      complete: () => console.log('Getting the data from backend..')
    })
  }

  // insert value
  AddDataInBackend(){
    // get data from form
    let rating: string = this.feedbackForm.get(['rating'])!.value;
    let text: string = this.feedbackForm.get(['text'])!.value;
    // the above syntax is to espically specify that value cannot be null. This is used because it throw error that value can be null instead of string. Because we are taking data from radio button.
    let uid = "101";

    // create an object with the obtained data to send in backend
    let feedbackRecord : Feedback = new Feedback(uid, rating, text);

    //Call the service with this data to insert record in database.
    this.feedbackService.insertData(feedbackRecord).subscribe({
      next : (data) => {alert('Insert operation is successful..'); this.getDataFromService();},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log("Insert operation is successful...")
    })
  }
}
