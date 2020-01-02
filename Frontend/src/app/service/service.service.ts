import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  public API = '//localhost:8080';
  //public API = 'http://192.168.1.47:8080';

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
  getleaveTypeForAlldays():Observable<any>{
      return this.http.get(this.API+'/leaveTypeForAlldays',{})
  }
  getLeavesToNotCompleteBySupervisor(department:String):Observable<any>{
      return this.http.get(this.API+'/LeavesToNotCompleteBySupervisor/'+department,{})
  }
  getShowLeaves2(leaID : String):Observable<any>{
      return this.http.get(this.API+'/showleave3/'+leaID,{})
  }
  getShowLeavesNotApproveBySup(department:String):Observable<any>{
      return this.http.get(this.API+'/NotApproveBySup/'+department,{})
  }
  getshowLeavesToComplete():Observable<any>{
      return this.http.get(this.API+'/showLeavesToComplete',{})
  }
  getshowLeavesToNotComplete():Observable<any>{
      return this.http.get(this.API+'/showLeavesToNotComplete',{})
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
  getLeavesSelectDepartment(department:String):Observable<any>{
      return this.http.get(this.API+'/LeavesSelectDepartment/'+department,{})
  }
  show1rowof1person(empID:String,leaveID:String):Observable<any>{
      return this.http.get(this.API+'/show1rowof1person/'+empID+'/'+leaveID,{})
  }

}
