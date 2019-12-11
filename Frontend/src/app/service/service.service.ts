import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  public API = '//localhost:8080';


  constructor( private http: HttpClient ) { }

  getemployee(): Observable<any>{
      return this.http.get(this.API+'/ILS_HR'+'/employee',{})
  }
  getBank():Observable<any>{
      return this.http.get(this.API+'/bank',{})
  }
  getDepartment():Observable<any>{
      return this.http.get(this.API+'/department',{})
  }
  getPosition():Observable<any>{
      return this.http.get(this.API+'/position',{})
  }
  getRoleStatus():Observable<any>{
      return this.http.get(this.API+'/roleStatus',{})
  }
  getSearchEmployeeForAttendance(employeeCode:String): Observable<any>{
      return this.http.get(this.API+'/SearchEmployeeForAttendance/'+employeeCode,{})
  }
  getUserPassword(employeeCode: String, password : String): Observable<any>{
      return this.http.get(this.API+'/login/'+employeeCode+'/'+password,{})
  }


}
