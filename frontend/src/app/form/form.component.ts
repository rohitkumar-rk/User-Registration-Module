import { UserTableComponent } from './../user-table/user-table.component';
import { Component, OnInit } from '@angular/core';
import { Address } from '../address';
import { User } from '../user';
import { EnrollmentService } from '../enrollment.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  public userTableComponent: UserTableComponent;
  title = 'Add User';
  public users = [];

  addressModel = new Address(null,'','','',null,'');
  userModel = new User(null,'','',[]);


  
  constructor(private _enrollmentService: EnrollmentService){}

  onSubmit(){
    this.userModel.address.push(this.addressModel);
    console.log(this.userModel);
    this._enrollmentService.enroll(this.userModel)
     .subscribe(
       data => console.log('Succes!', data),
       error => console.error('Error!', error)
     )
     //this.userTableComponent.ngOnInit();
     this.userTableComponent.test();
    }
    

}







