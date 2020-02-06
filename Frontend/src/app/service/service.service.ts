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
  getLeavesSelectDepartmentBySupervisor(empID:String):Observable<any>{
      return this.http.get(API1+'/LeavesSelectDepartmentBySupervisor/'+empID,{})
  }
  getSearchEmployeeByCodeAndNameInApprove(dataSearch:String,empID:any):Observable<any>{
      return this.http.get(API1+'/getSearchEmployeeByCodeAndNameInApprove' +'/'+ dataSearch +'/'+ empID,{})
  }
  getgetSearchEmployeeByCodeAndNameInApproveBySupervisor(dataSearch:String,empID:any):Observable<any>{
      return this.http.get(API1+'/getSearchEmployeeByCodeAndNameInApproveBySupervisor' +'/'+ dataSearch +'/'+ empID,{})
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
  getDepartmentMasterRoleFindByDepartmentID(departmentID : any):Observable<any>{
      return this.http.get(API1+'/getDepartmentMasterRoleFindByDepartmentID' +'/'+ departmentID,{})
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
  getLeaveAtManager():Observable<any>{
      return this.http.get(API1+'/getLeaveAtManager',{})
  }
  getSearchLeaveAtManager(dataSearch:String):Observable<any>{
      return this.http.get(API1+'/SearchLeaveAtManager/'+dataSearch,{})
  }

  //////////////////////////////////////////////////////////////////
  ///////                   report                           //////
  ////////////////////////////////////////////////////////////////

  getLeavesEmployeeNoDate(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string):Observable<any>{
    return this.http.get(API1+'/getLeavesEmployee/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch,{})
  }

  getLeavesEmployeeHaveDate(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string , datestart:string , dateend:string):Observable<any>{
    return this.http.get(API1+'/getLeavesEmployeeHavedate/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch+'/'+datestart+'/'+dateend,{})
  }


  getLeavesSupervisor(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string):Observable<any>{
    return this.http.get(API1+'/getLeavesSupervisor/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch,{})
  }


getLeavesSupervisorHaveDate(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string,datestart:string , dateend:string):Observable<any>{
    return this.http.get(API1+'/getLeavesSupervisorHavedate/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch+'/'+datestart+'/'+dateend,{})
  }


getLeavesManager(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string):Observable<any>{
    return this.http.get(API1+'/getLeavesManager/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch,{})
  }


getLeavesManagerHavedate(empid : string , leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string,datestart:string , dateend:string):Observable<any>{
    return this.http.get(API1+'/getLeavesManagerHavedate/'+empid+'/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch+'/'+datestart+'/'+dateend,{})
  }

getLeavesDCManager(leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string):Observable<any>{
    return this.http.get(API1+'/getLeavesDCManager/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch,{})
  }

getLeavesDCManagerHavedate(leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string,datestart:string , dateend:string):Observable<any>{
    return this.http.get(API1+'/getLeavesDCManagerHavedate/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch+'/'+datestart+'/'+dateend,{})
  }

getLeavesHRADMIN(leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string):Observable<any>{
    return this.http.get(API1+'/getLeavesHRADMIN/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch,{})
  }

getLeavesHRADMINHavedate(leaveTypeSearch : string , leaveStatusSearch : string , departmentSelect:string ,
  leavePayment:string , dataSearch:string,datestart:string , dateend:string):Observable<any>{
    return this.http.get(API1+'/getLeavesHRADMINHavedate/'+leaveTypeSearch+'/'+leaveStatusSearch+'/'+departmentSelect
    +'/'+leavePayment+'/'+dataSearch+'/'+datestart+'/'+dateend,{})
  }

}
