import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Staff from '../staffListInterface';
import { RestServiceService } from '../rest-service.service';

@Component({
  selector: 'app-staff-details',
  standalone: false,
  templateUrl: './staff-details.component.html',
  styleUrl: './staff-details.component.css'
})
export class StaffDetailsComponent {
  constructor(private route : ActivatedRoute, private restServiceObj : RestServiceService){}
  id! : any ;
  staffList !: Staff[];
  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.restServiceObj.provideStaffData().subscribe({
      next : (data) => {this.staffList = data},
      error : (err) => alert(JSON.stringify(err)),
      complete : () => console.log('done')
    })
    /*this.staffList = this.staffList.filter((staffMember : Staff) => staffMember.staffId == this.id);*/
  }
}
