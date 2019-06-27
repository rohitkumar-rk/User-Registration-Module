import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
// import { Http, Response, RequestOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  public data = [];
  _url = 'http://localhost:8080/add';
  _getUrl = 'http://localhost:8080/users';
  _deleteUrl = 'http://localhost:8080/delete/';
  
  constructor(private _http : HttpClient) { }

  enroll(user: User){
   return this._http.post<any>(this._url,user);
   }

   getUsers() : Observable<any[]>{
     return this._http.get<any>(this._getUrl);
   }

   
   deleteUser(id : number) : Observable<any[]>{
    return  this._http.delete<any[]>("http://localhost:8080/delete/"+id);
   }

   
}

