import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  public API = '//localhost:8080/ILS_HR';   //for test
  //public API = 'http://192.168.1.47:8080/BookMeetingRoom';  //for build

  constructor( private http: HttpClient ) { }

  getemployee(): Observable<any>{
      return this.http.get(this.API+'/employee',{})

  }
  getaccountUsers(): Observable<any>{
      return this.http.get(this.API+'/accountUsers',{})
  }

  getUserPassword(id: String , password : String): Observable<any>{
      return this.http.post(this.API+'/Users/'+id+/Password/+password,{})
  }




}
