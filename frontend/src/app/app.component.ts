import { Component } from '@angular/core';
import { User } from './user';
import { Address } from './address';
import { EnrollmentService } from './enrollment.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'frontend';

  //constructor(private _enrollmentService: EnrollmentService){}
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
    }

  }

