import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API1 } from '../app.component';
@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  constructor( private http: HttpClient ) { }

  getemployee(): Observable<any>{
      return this.http.get(API1+'/ILS_HR'+'/employee',{})
  }
  getemployee1person(empID:any): Observable<any>{
      return this.http.get(API1+'/getemployee1person/'+empID,{})
  }
  getBank():Observable<any>{
      return this.http.get(API1+'/bank',{})
  }
  getPrefix():Observable<any>{
      return this.http.get(API1+'/prefix',{})
  }
  getGender2():Observable<any>{
      return this.http.get(API1+'/gender',{})
  }
  getDepartment():Observable<any>{
      return this.http.get(API1+'/department',{})
  }
  getPosition():Observable<any>{
      return this.http.get(API1+'/position',{})
  }
  getEmployeeType():Observable<any>{
      return this.http.get(API1+'/employeeType',{})
  }
  getEducation():Observable<any>{
      return this.http.get(API1+'/education',{})
  }
  getEmpStatus():Observable<any>{
      return this.http.get(API1+'/empStatus',{})
  }
  getRoleStatus():Observable<any>{
      return this.http.get(API1+'/roleStatus',{})
  }
  getleaveTypeForAlldays():Observable<any>{
      return this.http.get(API1+'/leaveTypeForAlldays',{})
  }
  getMasterAttendance():Observable<any>{
      return this.http.get(API1+'/masterAttendances',{})
  }
  getLeavesToNotCompleteBySupervisor(empId:String):Observable<any>{
      return this.http.get(API1+'/LeavesToNotCompleteBySupervisor/'+empId,{})
  }
  getShowLeaves2(leaID : String):Observable<any>{
      return this.http.get(API1+'/showleave3/'+leaID,{})
  }
  getShowLeavesNotApproveBySup(empID:String):Observable<any>{
      return this.http.get(API1+'/NotApproveBySup/'+empID,{})
  }
  getshowLeavesToComplete():Observable<any>{
      return this.http.get(API1+'/showLeavesToComplete',{})
  }
  getshowLeavesToNotComplete():Observable<any>{
      return this.http.get(API1+'/showLeavesToNotComplete',{})
  }
  getSearchEmployeeForAttendance(employeeMasterID:String): Observable<any>{
      return this.http.get(API1+'/SearchEmployeeForAttendance/'+employeeMasterID,{})
  }
  getSearchEmployeeForAttendance2(id:String): Observable<any>{
      return this.http.get(API1+'/SearchEmployeeForAttendance2/'+id,{})
  }
  getUserPassword(employeeCode: String, password : String): Observable<any>{
      return this.http.get(API1+'/login/'+employeeCode+'/'+password,{})
  }
  getShowLeavesNumber(leaID : String):Observable<any>{
      return this.http.get(API1+'/showleaveNumber/'+leaID,{})
  }
  getSearchEmployee(dataSearch:String):Observable<any>{
      return this.http.get(API1+'/SearchEmployee/'+dataSearch,{})
  }
  getLeavesSelectDepartment(empID:String):Observable<any>{
      return this.http.get(API1+'/LeavesSelectDepartment/'+empID,{})
  }
  show1rowof1person(empID:String,leaveID:String):Observable<any>{
      return this.http.get(API1+'/show1rowof1person/'+empID+'/'+leaveID,{})
  }
  getDepartmentMasterRole():Observable<any>{
      return this.http.get(API1+'/DepartmentMasterRole',{})
  }
  getSearchEmployeeByCodeAndName(empID:String):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByCodeAndName' +'/'+ empID,{})
  }
  getSearchEmployeeByCodeAndName2(empID:String):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByCodeAndName2' +'/'+ empID,{})
  }
  getSearchEmployeeByDepartmentID(departmentID:String):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByDepartmentID' +'/'+ departmentID,{})
  }
  getSearchEmployeeByDepartmentID2(departmentID:String):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByDepartmentID2' +'/'+ departmentID,{})
  }
  getLeavesFindByID(leavesID : any):Observable<any>{
      return this.http.get(API1+'/showLeavesFindByID' +'/'+ leavesID,{})
  }
  getSearchEmpCode(EmpCode : String):Observable<any>{
      return this.http.get(API1+'/SearchEmpCode' +'/'+ EmpCode,{})
  }
  getDepartmentMasterRole2(employeeMasterID : any):Observable<any>{
      return this.http.get(API1+'/getDepartmentMasterRole' +'/'+ employeeMasterID,{})
  }
  getDepartmentMasterRoleFindByEmpCode(keyword : String):Observable<any>{
      return this.http.get(API1+'/getDepartmentMasterRoleFindByEmpCode' +'/'+ keyword,{})
  }
  getSearchEmployeeByCodeAndNameInApproveBySup(dataSearch:String,empID:any):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByCodeAndNameInApproveBySup' +'/'+ dataSearch +'/'+ empID,{})
  }
  getSearchEmployeeByCodeAndNameInApproveByManager(dataSearch:String,empID:any):Observable<any>{
      return this.http.get(API1+'/SearchEmployeeByCodeAndNameInApproveByManager' +'/'+ dataSearch +'/'+ empID,{})
  }
  getMasterRole():Observable<any>{
      return this.http.get(API1+'/masterRole',{})
  }
  getUserRoles(empID : any):Observable<any>{
      return this.http.get(API1+'/userRoles/' + empID,{})
  }
  getUserRolesByEmpCode(empCode : any):Observable<any>{
      return this.http.get(API1+'/userRolesByEmpCode/' + empCode,{})
  }
}
