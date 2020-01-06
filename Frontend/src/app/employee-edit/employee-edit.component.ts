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
import { AppComponent } from '../app.component';

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
        public API = '//localhost:8080';
        //public API = 'http://192.168.1.47:8080';
        nowDate = new Date();
        employee: Array<any>;
        empID : null;
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
        NewRoleStatus: string;
        dis;
        empId = localStorage.getItem('empId');
        fName = localStorage.getItem('fName');
        lName = localStorage.getItem('lName');
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
            //console.log('employee in edit -> ',this.employee);
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

         // console.log(this.data);

      }

      EditEmployee(){
           this.http.post(this.API + '/editemployee/' + this.NewemployeeMasterID +'/'+ this.NewemployeeMasterCustomerCode +'/'+ this.Newprefix  +'/'+ this.NewemployeeMasterFirstName
                                                    +'/'+ this.NewemployeeMasterLastName +'/'+ this.NewemployeeMasterNickName +'/'+ this.NewemployeeMasterGender
                                                    +'/'+ this.NewmaritalStatus +'/'+ this.NewemployeeMasterBirthDate +'/'+ this.NewemployeeMasterPersonID
                                                    +'/'+ this.NewemployeeMasterTel1 +'/'+ this.NewempEmail +'/'+ this.NewempAddressReal +'/'+ this.NewempAddressPerson +'/'+ this.NewemergencyContact
                                                    +'/'+ this.NewemployeeMasterStartDate +'/'+ this.NewemployeePosition +'/'+ this.NewemployeeDepartment
                                                    +'/'+ this.NewemployeeType +'/'+ this.Neweducation +'/'+ this.Newbank +'/'+ this.NewbankNumber +'/'+ this.Newpassword +'/'+ this.fName +'/'+ this.lName ,{})
                                   .subscribe(
                                       data => {
                                           console.log('EditEmployee is successful');
                                           alert("Edit Success!");
                                            this.BackupEmployeeMaster();
                                            localStorage.setItem('links', 'employeeMaster');
                                           window.location.reload(true);

                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );
      }

    BackupEmployeeMaster(){
            this.http.post(this.API + '/BackupEmployeeMaster/' + this.NewemployeeMasterID +'/'+ this.NewemployeeMasterCustomerCode +'/'+ this.Newprefix  +'/'+ this.NewemployeeMasterFirstName
                                                    +'/'+ this.NewemployeeMasterLastName +'/'+ this.NewemployeeMasterNickName +'/'+ this.NewemployeeMasterGender
                                                    +'/'+ this.NewmaritalStatus +'/'+ this.NewemployeeMasterBirthDate +'/'+ this.NewemployeeMasterPersonID
                                                    +'/'+ this.NewemployeeMasterTel1 +'/'+ this.NewempEmail +'/'+ this.NewempAddressReal +'/'+ this.NewempAddressPerson +'/'+ this.NewemergencyContact
                                                    +'/'+ this.NewemployeeMasterStartDate +'/'+ this.NewemployeePosition +'/'+ this.NewemployeeDepartment
                                                    +'/'+ this.NewemployeeType +'/'+ this.Neweducation +'/'+ this.Newbank +'/'+ this.NewbankNumber +'/'+ this.Newpassword
                                                    +'/'+ this.fName +'/'+ this.lName +'/'+ this.NewRoleStatus,{})
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


