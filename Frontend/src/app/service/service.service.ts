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
  getLeaveType():Observable<any>{
      return this.http.get(this.API+'/leaveType',{})
  }
  getLeaves():Observable<any>{
      return this.http.get(this.API+'/leaves',{})
  }
  getShowLeaves(leaID : String):Observable<any>{
      return this.http.get(this.API+'/showleave2/'+leaID,{})
  }
  getShowLeaves2(leaID : String):Observable<any>{
      return this.http.get(this.API+'/showleave3/'+leaID,{})
  }
  getSearchEmployeeForAttendance(employeeMasterID:String): Observable<any>{
      return this.http.get(this.API+'/SearchEmployeeForAttendance/'+employeeMasterID,{})
  }
  getSearchEmployeeForAttendance2(id:String): Observable<any>{
      return this.http.get(this.API+'/SearchEmployeeForAttendance2/'+id,{})
  }
  getUserPassword(employeeCode: String, password : String): Observable<any>{
      return this.http.get(this.API+'/login/'+employeeCode+'/'+password,{})
  }
  getShowLeavesNumber(leaID : String):Observable<any>{
      return this.http.get(this.API+'/showleaveNumber/'+leaID,{})
  }
  getSearchEmployee(dataSearch:String):Observable<any>{
      return this.http.get(this.API+'/SearchEmployee/'+dataSearch,{})
  }


}
