import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';
import { API1 } from '../app.component';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";

@Component({
  selector: 'app-edit-personal-information',
  templateUrl: './edit-personal-information.component.html',
  styleUrls: ['./edit-personal-information.component.css'],
  providers: [
  {
    provide: DateAdapter, useClass: AppDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }
  ]})

export class EditPersonalInformationComponent implements OnInit {
    employee: Array<any>;
    empId = sessionStorage.getItem('empId');
    fName = sessionStorage.getItem('fName');
    lName = sessionStorage.getItem('lName');
    NewemployeeMasterID : null;
    NewemployeeMasterCustomerCode: string;
    Newprefix : string;
    NewemployeeMasterFirstName : string;
    NewemployeeMasterLastName : string;
    NewemployeeMasterNickName: string;
    NewemployeeMasterGender: string;
    NewmaritalStatus: string;
    NewemployeeMasterBirthDate: any;
    NewemployeeMasterPersonID: string;
    NewemployeeMasterTel1: string;
    NewempEmail: string;
    NewempAddressReal: string;
    NewempAddressPerson: string;
    NewemployeeMasterStartDate: any;
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
    NewRoleStatus:string;
    hide: any;
    select:any;
    constructor(
      public dialogRef: MatDialogRef<EditPersonalInformationComponent>
                      ,changeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient){
                            dialogRef.disableClose = true;
      }

    closeDialog(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        //console.log('empID -->',this.empId);
        this.service.getemployee1person(this.empId).subscribe(data => {
            this.employee = data;
            this.addValue(data);
            //console.log('employee in edit -> ',this.employee);
        });

        this.service.getBank().subscribe(data => {
               this.NewBank = data;
               //console.log('NewBank >>> ',this.NewBank);
                 });
        this.service.getDepartment().subscribe(data => {
               this.department = data;
              // console.log('department == ',this.department);
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
    }
    EditEmployee(){
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
