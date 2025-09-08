import { Component } from '@angular/core';
import { FeedbackService } from './feedback.service';
import Feedback from './feedback/feedback';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(){
    
  }
}
