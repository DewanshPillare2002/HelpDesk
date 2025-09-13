import { Component } from '@angular/core';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private shareDataObj:ShareDataService){}
  clicked : boolean = true;
  profileIconFunction(){
    alert('Profile Icon Function');
  }
  gotoHomePage(){
    this.clicked = false;
    this.shareDataObj.updateFlag(this.clicked);
  }
}
