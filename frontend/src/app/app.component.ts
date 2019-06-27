import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { Address } from './address';
import { EnrollmentService } from './enrollment.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  title = 'frontend';
  public users = [];
  ngOnInit(): void {
    this.getUsers();
    // var table = document.getElementById("tableUserData");
    // console.log(this.users.length);
    // if (this.users.length==0) 
    //   table.style.display = "none";
    // console.log(this.users.length);
  }


  
  //constructor(private _enrollmentService: EnrollmentService){}
  addressModel = new Address(null,'','','',null,'');
  userModel = new User(null,'','',[]);

  

  constructor(private _enrollmentService: EnrollmentService){}

//----------------  Submit Method to Add Data to DB and retrive-------

  onSubmit(){
    this.userModel.address.push(this.addressModel);
    console.log(this.userModel);
    this._enrollmentService.enroll(this.userModel)
     .subscribe(
       data => {
        console.log('Succes!', data);
        this.getUsers();
        // var table = document.getElementById("tableUserData");
        // table.style.display = "table";
        // console.log(this.users.length);
       },
       error => console.error('Error!', error),
     )
    }

    //----------------------- Submit Ends here  -----------------------


    //------------------------- GEt MEthod to retrieve data from db and show in table --------
    getUsers(){
      this._enrollmentService.getUsers()
      .subscribe(data => this.users = data);  
    }

    //----------------------------  Get Ends Here -----------------



    //-------------------------- Method to hide e-mail address -------------------

    hideEmail(target) {
      var email = target;
      var hiddenEmail = "";
      for (var i = 0; i < email.length; i++) {
        if (i > 0 && i< email.indexOf("@") ) {
          if(email[i]=="." || email[i]=="_"){
            hiddenEmail += email[i]
            i++;
            hiddenEmail +=email[i];
    
          }
          hiddenEmail += "*";
        } else {
          hiddenEmail += email[i];
        }
      }
      return hiddenEmail;
    }

    //------------------------- Hide Email Ends Here -----------------------

    //--------------------------- Delete Method -----------------------
    deleteFromView(i:number){
      this.users.splice(i, 1);
     }


     delete(i: number){
      // this.arrr.splice(i, 1);
      this._enrollmentService.deleteUser(i).subscribe(
        res => {
          this.getUsers();
      },
      );
    }


    //----------------------- Delete Ends Here  -----------------------
}

