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

  employee : Array<any>;
  id : String ;
  NewPassword : String ;
  role : string;
  userRoles: Array<any>;
  open = false;
  logouts = localStorage.getItem('logouts');
  empId = localStorage.getItem('empId');
  NewemployeeMasterFirstName =  localStorage.getItem('fName');
  NewemployeeMasterLastName =  localStorage.getItem('lName');
  links = localStorage.getItem('links');
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
  private _mobileQueryListener: () => void;

  ngOnInit() : void {
        this.role = localStorage.getItem('role');
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

                              localStorage.setItem('selectAttendance', 'true');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');

                          if(this.links == 'employeeMaster'){
                              localStorage.setItem('selectEmployeemaster', 'true');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                              localStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                          }
                          else if(this.links == 'attendanceData'){
                              localStorage.setItem('selectAttendanceDate', 'true');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                              localStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                          }
                          else if(this.links == 'attendance'){
                              localStorage.setItem('selectAttendance', 'true');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                              localStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                          }
                          else if(this.links == 'approvebysupervisor'){
                              localStorage.setItem('selectApproveBySupervisor', 'true');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                              localStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                          }
                          else if(this.links == 'approvebymanager'){
                              localStorage.setItem('selectApproveByManager', 'true');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                              localStorage.setItem('selectAddDepartmentRole', 'false');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                          }
                          else if(this.links == 'addDepartmentRole'){
                              localStorage.setItem('selectAddDepartmentRole', 'true');
                              this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
                              localStorage.setItem('selectApproveByManager', 'false');
                              this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
                              localStorage.setItem('selectApproveBySupervisor', 'false');
                              this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
                              localStorage.setItem('selectAttendance', 'false');
                              this.selectAttendance =  localStorage.getItem('selectAttendance');
                              localStorage.setItem('selectAttendanceDate', 'false');
                              this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
                              localStorage.setItem('selectEmployeemaster', 'false');
                              this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
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
            else
              this.role12 = true;
        }
        this.open=true;
      }
      shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

      OpenEditPersonalInformationComponent(){
          const dialogRef = this.dialog.open(EditPersonalInformationComponent, {
              width: '90%',
              height:'90%',
          });
      }

      logout(){
        localStorage.clear();
        localStorage.setItem('logouts', 'true');
        //window.location.reload(true);
        this.router.navigate(['HR-ADMIN']);
      }
      callEmployeeMaster(){
          localStorage.setItem('links', 'employeeMaster');
          localStorage.setItem('selectEmployeemaster', 'true');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');

          /*console.log(this.selectEmployeemaster);*/
      }
      callEmployeeAdd(){
          localStorage.setItem('links', 'employeeMaster');
          localStorage.setItem('selectEmployeeAdd', 'true');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }
      callAttendance(){
          localStorage.setItem('links', 'attendance');
          localStorage.setItem('selectAttendance', 'true');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }
      callAttendanceData(){
          localStorage.setItem('links', 'attendanceData');
          localStorage.setItem('selectAttendanceDate', 'true');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }
      callApproveBySupervisor(){
          localStorage.setItem('links', 'attendance');
          localStorage.setItem('selectApproveBySupervisor', 'true');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }

      callApproveByManager(){
          localStorage.setItem('links', 'attendance');
          localStorage.setItem('selectApproveByManager', 'true');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }

      callAddDepartmentRole(){
          localStorage.setItem('links', 'addDepartmentRole');
          localStorage.setItem('selectAddDepartmentRole', 'true');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }

      callAddDataCombobox(){
          localStorage.setItem('links', 'addDepartmentRole');
          localStorage.setItem('selectAddDataCombobox', 'true');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectAddUserRole', 'false');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
      }

      callAddUserRole(){
          localStorage.setItem('links', 'addDepartmentRole');
          localStorage.setItem('selectAddUserRole', 'true');
          this.selectAddUserRole =  localStorage.getItem('selectAddUserRole');
          localStorage.setItem('selectAddDataCombobox', 'false');
          this.selectAddDataCombobox =  localStorage.getItem('selectAddDataCombobox');
          localStorage.setItem('selectAddDepartmentRole', 'false');
          this.selectAddDepartmentRole =  localStorage.getItem('selectAddDepartmentRole');
          localStorage.setItem('selectApproveByManager', 'false');
          this.selectApproveByManager =  localStorage.getItem('selectApproveByManager');
          localStorage.setItem('selectApproveBySupervisor', 'false');
          this.selectApproveBySupervisor =  localStorage.getItem('selectApproveBySupervisor');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
      }

}


