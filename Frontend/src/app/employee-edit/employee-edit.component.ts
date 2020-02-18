import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';

import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { API1 } from '../app.component';

export interface DialogData {
  employeeMasterID : null;
  isActive: string;
}
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
    providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    ]
})

export class EmployeeEditComponent implements OnInit {
        nowDate = new Date();
        employee: Array<any>;
        empID : null;

        RoleEmployee = [4, 5, 10, 11];
        RoleManager = [4, 5, 8, 10, 11];
        RoleSupervisor = [4, 5, 7, 10, 11];
        RoleHR_ADMIN = [1, 2, 3, 4, 6, 10, 11, 12, 13, 15];
        RoleDcManager = [9, 10, 11];

        NewemployeeMasterID : null;
        NewemployeeMasterCustomerCode: string;
        Newprefix : string;
        NewemployeeMasterFirstName : string;
        NewemployeeMasterLastName : string;
        NewemployeeMasterNickName: string;
        NewemployeeMasterGender: string;
        NewmaritalStatus: string;
        NewemployeeMasterBirthDate: string;
        NewemployeeMasterPersonID: string;
        NewemployeeMasterTel1: string;
        NewempEmail: string;
        NewempAddressReal: string;
        NewempAddressPerson: string;
        NewemployeeMasterStartDate: string;
        position: Array<any>;
        NewemployeePosition: string;
        department: Array<any>;
        NewemployeeDepartment: string;
        NewemployeeType: string;
        Neweducation: string;
        NewBank: Array<any>;
        Newbank: string;
        NewbankNumber: string;
        NewIsActive: string;
        Newpassword: string;
        NewemergencyContact: string;
        education: Array<any>;
        employeeType: Array<any>;
        gender:Array<any>;
        prefix: Array<any>;
        empStatus: Array<any>;
        masterRole: Array<any>;
        NewRoleStatus: string;
        dis;
        select:any;
        empId = sessionStorage.getItem('empId');
        fName = sessionStorage.getItem('fName');
        lName = sessionStorage.getItem('lName');
        nameInLogin = sessionStorage.getItem('nameInLogin');
        roleStatusInLogin = sessionStorage.getItem('roleStatusInLogin');
      constructor(public dialogRef: MatDialogRef<EmployeeEditComponent>
                      ,hangeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient
                      ,@Inject(MAT_DIALOG_DATA)  public date: DialogData) {
                            dialogRef.disableClose = true;
                  this.empID = date.employeeMasterID
      }

      closeDialog(): void {
        this.dialogRef.close();
      }

      ngOnInit() {
        this.service.getemployee1person(this.empID).subscribe(data => {
            this.employee = data;
            this.addValue(data);
            console.log('employee in edit -> ',this.employee);
        });
        this.service.getBank().subscribe(data => {
               this.NewBank = data;
               //console.log('NewBank >>> ',this.NewBank);
                 });
        this.service.getDepartment().subscribe(data => {
               this.department = data;
               //console.log('department == ',this.department);
                 });
        this.service.getPosition().subscribe(data => {
               this.position = data;
               //console.log('position == ',this.position);
                 });
        this.service.getPrefix().subscribe(data => {
               this.prefix = data;
               //console.log('prefix == ',this.prefix);
                 });
        this.service.getGender2().subscribe(data => {
               this.gender = data;
               //console.log('gender == ',this.gender);
                 });
        this.service.getEmployeeType().subscribe(data => {
               this.employeeType = data;
               //console.log('employeeType == ',this.employeeType);
                 });
        this.service.getEducation().subscribe(data => {
               this.education = data;
               //console.log('education == ',this.education);
                 });
        this.service.getEmpStatus().subscribe(data => {
               this.empStatus = data;
               //console.log('empStatus == ',this.empStatus);
                 });
        this.service.getMasterRole().subscribe(data => {
               this.masterRole = data;
               //console.log('masterRole == ',this.masterRole);
                 });
      }
      AddUserRole(){
         this.service.getUserRoles(this.NewemployeeMasterID).subscribe(data => {
                              //this.userRole = data;
                              //console.log('userRole -> ',this.userRole);
                              if(data.length==0){
                                if(this.NewRoleStatus == "ADMIN"){
                                  for(let i=1;i<=this.masterRole.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ i +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(i," InsertUserRole is successfull");
                                      });
                                  }
                                }
                                else if(this.NewRoleStatus == "EMPLOYEE"){
                                  for(let i=0;i<this.RoleEmployee.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ this.RoleEmployee[i] +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(this.RoleEmployee[i]," InsertUserRole is successfull");
                                      });
                                  }
                                }
                                else if(this.NewRoleStatus == "MANAGER"){
                                  for(let i=0;i<this.RoleManager.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ this.RoleManager[i] +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(this.RoleManager[i]," InsertUserRole is successfull");
                                      });
                                  }
                                }
                                else if(this.NewRoleStatus == "SUPERVISOR"){
                                  for(let i=0;i<this.RoleSupervisor.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ this.RoleSupervisor[i] +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(this.RoleSupervisor[i]," InsertUserRole is successfull");
                                      });
                                  }
                                }
                                else if(this.NewRoleStatus == "HR-ADMIN"){
                                  for(let i=0;i<this.RoleHR_ADMIN.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ this.RoleHR_ADMIN[i] +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(this.RoleHR_ADMIN[i]," InsertUserRole is successfull");
                                      });
                                  }
                                }
                                else if(this.NewRoleStatus == "DC-MANAGER"){
                                  for(let i=0;i<this.RoleDcManager.length;i++){
                                      this.http.post(API1 + '/insertUserRole/' + this.NewemployeeMasterID +'/'+ this.RoleDcManager[i] +'/'+ this.nameInLogin ,{})
                                      .subscribe(data => {
                                          console.log(this.RoleDcManager[i]," InsertUserRole is successfull");
                                      });
                                  }
                                }
                              }
         });
      }
      DelectRoleStatus(){
            this.service.getUserRoles(this.NewemployeeMasterID).subscribe(data => {
                if(data.length!=0){
                  for(let i of data){
                      this.http.delete(API1 + '/DeleteUserRole/' + i.id ,{}).subscribe(
                        data => {
                          console.log('DeleteUserRole is successful');
                        },
                        error => {
                          console.log('Error', error);
                        });
                  }
                }
            });
      }

      EditEmployee(){
      console.log(this.NewemployeeMasterBirthDate);
      console.log(this.NewemployeeMasterStartDate);
         for(let i of this.employee){
          if(i.roleStatus != this.NewRoleStatus){
            this.DelectRoleStatus();
          }
         }
           this.select = {
              NewempEmail:this.NewempEmail ,
              NewempAddressReal:this.NewempAddressReal,
              NewempAddressPerson:this.NewempAddressPerson,
              NewemergencyContact: this.NewemergencyContact,
            };
           this.http.post(API1 + '/editemployee/' + this.NewemployeeMasterID +'/'+ this.NewemployeeMasterCustomerCode +'/'+ this.Newprefix  +'/'+ this.NewemployeeMasterFirstName
                                                    +'/'+ this.NewemployeeMasterLastName +'/'+ this.NewemployeeMasterNickName +'/'+ this.NewemployeeMasterGender
                                                    +'/'+ this.NewmaritalStatus +'/'+ this.NewemployeeMasterBirthDate +'/'+ this.NewemployeeMasterPersonID
                                                    +'/'+ this.NewemployeeMasterTel1 +'/'+ this.NewemployeeMasterStartDate +'/'+ this.NewemployeePosition +'/'+ this.NewemployeeDepartment
                                                    +'/'+ this.NewemployeeType +'/'+ this.Neweducation +'/'+ this.Newbank +'/'+ this.NewbankNumber
                                                    +'/'+ this.Newpassword +'/'+ this.fName +'/'+ this.lName +'/'+ this.NewRoleStatus , JSON.stringify(this.select),{
                                                      headers: {"Content-Type": "application/json"}
                                                    })
                                   .subscribe(
                                       data => {
                                          this.AddUserRole();
                                           console.log('EditEmployee is successful');
                                           alert("EditEmployee is successful!");
                                            this.BackupEmployeeMasterOld();
                                            sessionStorage.setItem('links', 'employeeMaster');
                                           window.location.reload(true);

                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );
      }

      BackupEmployeeMasterOld(){
          for(let i of this.employee){
            this.select = {
                NewempEmail:i.empEmail ,
                NewempAddressReal:i.empAddressReal,
                NewempAddressPerson:i.empAddressPerson,
                NewemergencyContact: i.emergencyContact,
            };
            this.http.post(API1 + '/BackupEmployeeMaster/' + i.employeeMasterID +'/'+ i.employeeMasterCustomerCode +'/'+ i.prefix  +'/'+ i.employeeMasterFirstName
                                                    +'/'+ i.employeeMasterLastName +'/'+ i.employeeMasterNickName +'/'+ i.employeeMasterGender
                                                    +'/'+ i.maritalStatus +'/'+ i.employeeMasterBirthDate +'/'+ i.employeeMasterPersonID
                                                    +'/'+ i.employeeMasterTel1 +'/'+ i.employeeMasterStartDate +'/'+ i.employeePosition +'/'+ i.departmentid.departmentName
                                                    +'/'+ i.employeeType +'/'+ i.education +'/'+ i.bank +'/'+ i.bankNumber +'/'+ i.password
                                                    +'/'+ this.fName +'/'+ this.lName +'/'+ i.roleStatus, JSON.stringify(this.select),{
                                                      headers: {"Content-Type": "application/json"}
                                                    })
                                   .subscribe(
                                       data => {
                                           console.log('BackupEmployeeMasterOld is successful');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );
          }
    }
    BackupEmployeeMaster(){
            this.select = {
                NewempEmail:this.NewempEmail ,
                NewempAddressReal:this.NewempAddressReal,
                NewempAddressPerson:this.NewempAddressPerson,
                NewemergencyContact: this.NewemergencyContact,
            };
            this.http.post(API1 + '/BackupEmployeeMaster/' + this.NewemployeeMasterID +'/'+ this.NewemployeeMasterCustomerCode +'/'+ this.Newprefix  +'/'+ this.NewemployeeMasterFirstName
                                                    +'/'+ this.NewemployeeMasterLastName +'/'+ this.NewemployeeMasterNickName +'/'+ this.NewemployeeMasterGender
                                                    +'/'+ this.NewmaritalStatus +'/'+ this.NewemployeeMasterBirthDate +'/'+ this.NewemployeeMasterPersonID
                                                    +'/'+ this.NewemployeeMasterTel1 +'/'+ this.NewemployeeMasterStartDate +'/'+ this.NewemployeePosition +'/'+ this.NewemployeeDepartment
                                                    +'/'+ this.NewemployeeType +'/'+ this.Neweducation +'/'+ this.Newbank +'/'+ this.NewbankNumber +'/'+ this.Newpassword
                                                    +'/'+ this.fName +'/'+ this.lName +'/'+ this.NewRoleStatus, JSON.stringify(this.select),{
                                                      headers: {"Content-Type": "application/json"}
                                                    })
                                   .subscribe(
                                       data => {
                                           console.log('BackupEmployeeMaster is successful');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );
    }

    addValue(data:any){
        for (let i of data){
            this.NewemployeeMasterID = i.employeeMasterID;
            this.NewemployeeMasterCustomerCode = i.employeeMasterCustomerCode;
            this.Newprefix = i.prefix;
            this.NewemployeeMasterFirstName = i.employeeMasterFirstName;
            this.NewemployeeMasterLastName = i.employeeMasterLastName;
            this.NewemployeeMasterNickName = i.employeeMasterNickName;
            this.NewemployeeMasterGender = i.employeeMasterGender;
            this.NewmaritalStatus = i.maritalStatus;
            this.NewemployeeMasterBirthDate = i.employeeMasterBirthDate;
            this.NewemployeeMasterPersonID = i.employeeMasterPersonID;
            this.NewemployeeMasterTel1 = i.employeeMasterTel1;
            this.NewempEmail = i.empEmail;
            this.NewempAddressReal = i.empAddressReal;
            this.NewempAddressPerson = i.empAddressPerson;
            this.NewemergencyContact = i.emergencyContact;
            this.NewemployeeMasterStartDate = i.employeeMasterStartDate;
            this.NewemployeePosition = i.employeePosition;
            this.NewemployeeDepartment = i.departmentid.departmentName;
            this.NewemployeeType = i.employeeType;
            this.Neweducation = i.education;
            this.Newbank = i.bank;
            this.NewbankNumber = i.bankNumber;
            this.NewIsActive = i.IsActive;
            this.Newpassword = i.password;
            this.NewRoleStatus = i.roleStatus;
        }
    }

}


