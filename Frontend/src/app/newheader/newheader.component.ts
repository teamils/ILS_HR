import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import { ServiceService } from '../service/service.service';
import { Inject} from '@angular/core';
import { API1 } from '../app.component';
import { EditPersonalInformationComponent } from '../edit-personal-information/edit-personal-information.component';

export interface DialogData {
  employee : Array<any>;
  id : String ;
  NewPassword : String ;

}

@Component({
  selector: 'app-newheader',
  templateUrl: './newheader.component.html',
  styleUrls: ['./newheader.component.css']
})
export class NewheaderComponent implements OnInit {

  mobileQuery: MediaQueryList;

  selectHome : String;
  selectEmployeemaster : String;
  selectEmployeeAdd : String;
  selectAttendance : String;
  selectAttendanceDate : String;
  selectApproveBySupervisor : String;
  selectApproveByManager : String;
  selectAddDepartmentRole : String;
  selectAddDataCombobox : String;
  selectAddUserRole : String;
  selectDcManager : String;
  selectReport : String;
  selectReportEmployeeMaster : String;

  employee : Array<any>;
  id : String ;
  NewPassword : String ;
  role : string;
  userRoles: Array<any>;
  open = false;
  logouts = sessionStorage.getItem('logouts');
  empId = sessionStorage.getItem('empId');
  NewemployeeMasterFirstName =  sessionStorage.getItem('fName');
  NewemployeeMasterLastName =  sessionStorage.getItem('lName');
  links = sessionStorage.getItem('links');
  roleStatusInLogin = sessionStorage.getItem('roleStatusInLogin');

  role1 : boolean = false;
  role2 : boolean = false;
  role3 : boolean = false;
  role4 : boolean = false;
  role5 : boolean = false;
  role6 : boolean = false;
  role7 : boolean = false;
  role8 : boolean = false;
  role9 : boolean = false;
  role10 : boolean = false;
  role11 : boolean = false;
  role12 : boolean = false;
  role13 : boolean = false;
  role14 : boolean = false;
  role15 : boolean = false;
  role16 : boolean = false;

  private _mobileQueryListener: () => void;

  ngOnInit() : void {
        this.role = sessionStorage.getItem('role');
        this.mobileQuery.removeListener(this._mobileQueryListener);
        this.service.getemployee1person(this.empId).subscribe(data => {
            this.employee = data;
            //console.log('employee -> ',this.employee);
        });
        this.service.getUserRoles(this.empId).subscribe(data => {
            this.userRoles = data;
            //console.log('userRoles -> ',this.userRoles);
            this.getroles();
        });

  }

      constructor(changeDetectorRef: ChangeDetectorRef
                  ,media: MediaMatcher
                  ,public dialog: MatDialog
                  ,private router:Router
                  ,private route:ActivatedRoute
                  ,private service:ServiceService) {
                          this.mobileQuery = media.matchMedia('(max-width: 600px)');
                          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
                          this.mobileQuery.addListener(this._mobileQueryListener);

                  if(this.roleStatusInLogin != 'DC-MANAGER'){
                      sessionStorage.setItem('selectAttendance', 'true');
                      this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                  }
                  else{
                      sessionStorage.setItem('selectDcManager', 'true');
                      this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                  }
                          if(this.links == 'employeeMaster'){
                              sessionStorage.setItem('selectEmployeemaster', 'true');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'attendanceData'){
                              sessionStorage.setItem('selectAttendanceDate', 'true');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'attendance'){
                              sessionStorage.setItem('selectAttendance', 'true');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'approvebysupervisor'){
                              sessionStorage.setItem('selectApproveBySupervisor', 'true');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'approvebymanager'){
                              sessionStorage.setItem('selectApproveByManager', 'true');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'addDepartmentRole'){
                              sessionStorage.setItem('selectAddDepartmentRole', 'true');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'addDcManager'){
                              sessionStorage.setItem('selectDcManager', 'true');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                              sessionStorage.setItem('selectReport', 'false');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                          }
                          else if(this.links == 'report'){
                              sessionStorage.setItem('selectReport', 'true');
                              this.selectReport =  sessionStorage.getItem('selectReport');
                              sessionStorage.setItem('selectDcManager', 'false');
                              this.selectDcManager =  sessionStorage.getItem('selectDcManager');
                              sessionStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
                              sessionStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
                              sessionStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
                              sessionStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  sessionStorage.getItem('selectAttendance');
                              sessionStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
                              sessionStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
                          }

      }

      getroles(){
        for(let i = 0 ; i < this.userRoles.length ; i++){
            if(this.userRoles[i].masterRoleID.id == 1)
              this.role1 = true;
            else if(this.userRoles[i].masterRoleID.id == 2)
              this.role2 = true;
            else if(this.userRoles[i].masterRoleID.id == 3)
              this.role3 = true;
            else if(this.userRoles[i].masterRoleID.id == 4)
              this.role4 = true;
            else if(this.userRoles[i].masterRoleID.id == 5)
              this.role5 = true;
            else if(this.userRoles[i].masterRoleID.id == 6)
              this.role6 = true;
            else if(this.userRoles[i].masterRoleID.id == 7)
              this.role7 = true;
            else if(this.userRoles[i].masterRoleID.id == 8)
              this.role8 = true;
            else if(this.userRoles[i].masterRoleID.id == 9)
              this.role9 = true;
            else if(this.userRoles[i].masterRoleID.id == 10)
              this.role10 = true;
            else if(this.userRoles[i].masterRoleID.id == 11)
              this.role11 = true;
            else if(this.userRoles[i].masterRoleID.id == 12)
              this.role12 = true;
            else if(this.userRoles[i].masterRoleID.id == 13)
              this.role13 = true;
            else
              this.role14 = true;
        }
        this.open=true;
      }


      OpenEditPersonalInformationComponent(){
          const dialogRef = this.dialog.open(EditPersonalInformationComponent, {
              width: '90%',
              height:'90%',
          });
      }

      logout(){
        sessionStorage.clear();
        sessionStorage.setItem('logouts', 'true');
        //window.location.reload(true);
        this.router.navigate(['HR-ADMIN']);
      }
      callEmployeeMaster(){
          sessionStorage.setItem('links', 'employeeMaster');
          sessionStorage.setItem('selectEmployeemaster', 'true');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');

          /*console.log(this.selectEmployeemaster);*/
      }
      callEmployeeAdd(){
          sessionStorage.setItem('links', 'employeeMaster');
          sessionStorage.setItem('selectEmployeeAdd', 'true');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }
      callAttendance(){
          sessionStorage.setItem('links', 'attendance');
          sessionStorage.setItem('selectAttendance', 'true');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance');
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }
      callAttendanceData(){
          sessionStorage.setItem('links', 'attendanceData');
          sessionStorage.setItem('selectAttendanceDate', 'true');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }
      callApproveBySupervisor(){
          sessionStorage.setItem('links', 'attendance');
          sessionStorage.setItem('selectApproveBySupervisor', 'true');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callApproveByManager(){
          sessionStorage.setItem('links', 'attendance');
          sessionStorage.setItem('selectApproveByManager', 'true');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callAddDepartmentRole(){
          sessionStorage.setItem('links', 'addDepartmentRole');
          sessionStorage.setItem('selectAddDepartmentRole', 'true');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callAddDataCombobox(){
          sessionStorage.setItem('links', 'addDepartmentRole');
          sessionStorage.setItem('selectAddDataCombobox', 'true');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callAddUserRole(){
          sessionStorage.setItem('links', 'addDepartmentRole');
          sessionStorage.setItem('selectAddUserRole', 'true');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callDCManager(){
          sessionStorage.setItem('links', 'addDcManager');
          sessionStorage.setItem('selectDcManager', 'true');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callReport(){
          sessionStorage.setItem('links', 'report');
          sessionStorage.setItem('selectReport', 'true');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
          sessionStorage.setItem('selectReportEmployeeMaster', 'false');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
      }

      callReportEmployeeMaster(){
          sessionStorage.setItem('links', 'report');
          sessionStorage.setItem('selectReportEmployeeMaster', 'true');
          this.selectReportEmployeeMaster =  sessionStorage.getItem('selectReportEmployeeMaster');
          sessionStorage.setItem('selectReport', 'false');
          this.selectReport =  sessionStorage.getItem('selectReport');
          sessionStorage.setItem('selectDcManager', 'false');
          this.selectDcManager =  sessionStorage.getItem('selectDcManager');
          sessionStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  sessionStorage.getItem('selectAddUserRole');
          sessionStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  sessionStorage.getItem('selectAddDataCombobox');
          sessionStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  sessionStorage.getItem('selectAddDepartmentRole');
          sessionStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  sessionStorage.getItem('selectApproveByManager');
          sessionStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  sessionStorage.getItem('selectApproveBySupervisor');
          sessionStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  sessionStorage.getItem('selectAttendanceDate');
          sessionStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  sessionStorage.getItem('selectAttendance')
          sessionStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  sessionStorage.getItem('selectEmployeeAdd');
          sessionStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  sessionStorage.getItem('selectEmployeemaster');
      }


}


