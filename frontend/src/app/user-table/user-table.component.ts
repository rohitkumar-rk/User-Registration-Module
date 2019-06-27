import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  public users = [];

  constructor(private _enrollmentService: EnrollmentService){}

  ngOnInit() {
    console.log("Init worked");
    this._enrollmentService.getUsers()
    .subscribe(data => this.users = data); 
    // document.querySelector("#delete").UserTableComponent.cssText = "displayProperty: none";
  }

  test(){
    console.log("test worked");
  }

  delete(id : number){
    this._enrollmentService.deleteUser(id);

  }

  // getUsers(){
  //   this._enrollmentService.getUsers()
  //   .subscribe(data => this.users = data);  
  // }
  

}
