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

export interface DialogData {
    employeeMasterID : null;
    employeeMasterCustomerCode: string;
    prefix : string;
    employeeMasterFirstName : string;
    employeeMasterLastName : string;
    employeeMasterNickName: string;
    employeeMasterGender: string;
    maritalStatus: string;
    employeeMasterBirthDate: string;
    employeeMasterPersonID: string;
    employeeMasterTel1: string;
    empEmail: string;
    empAddressReal: string;
    empAddressPerson: string;
    employeeMasterStartDate: string;
    employeePosition: string;
    employeeDepartment: string;
    employeeType: string;
    education: string;
    bank: string;
    bankNumber: string;
    IsActive: string;
    password : string;
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
        public API = '//localhost:8080/';
        CurrentDateTime = new Date();
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

      constructor(public dialogRef: MatDialogRef<EmployeeEditComponent>
                      ,hangeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient
                      ,@Inject(MAT_DIALOG_DATA)  public data: DialogData) {
                            dialogRef.disableClose = true;
      }

      closeDialog(): void {
        this.dialogRef.close();
      }

      ngOnInit() {
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

         // console.log(this.data);
          this.NewemployeeMasterID = this.data.employeeMasterID;
          this.NewemployeeMasterCustomerCode = this.data.employeeMasterCustomerCode;
          this.Newprefix = this.data.prefix;
          this.NewemployeeMasterFirstName = this.data.employeeMasterFirstName;
          this.NewemployeeMasterLastName = this.data.employeeMasterLastName;
          this.NewemployeeMasterNickName = this.data.employeeMasterNickName;
          this.NewemployeeMasterGender = this.data.employeeMasterGender;
          this.NewmaritalStatus = this.data.maritalStatus;
          this.NewemployeeMasterBirthDate = this.data.employeeMasterBirthDate;
          this.NewemployeeMasterPersonID = this.data.employeeMasterPersonID;
          this.NewemployeeMasterTel1 = this.data.employeeMasterTel1;
          this.NewempEmail = this.data.empEmail;
          this.NewempAddressReal = this.data.empAddressReal;
          this.NewempAddressPerson = this.data.empAddressPerson;
          this.NewemployeeMasterStartDate = this.data.employeeMasterStartDate;
          this.NewemployeePosition = this.data.employeePosition;
          this.NewemployeeDepartment = this.data.employeeDepartment;
          this.NewemployeeType = this.data.employeeType;
          this.Neweducation = this.data.education;
          this.Newbank = this.data.bank;
          this.NewbankNumber = this.data.bankNumber;
          this.NewIsActive = this.data.IsActive;
          this.Newpassword = this.data.password;
      }

      EditEmployee(){
              this.http.post(this.API + '/editemployee/' + this.NewemployeeMasterID +'/'+ this.NewemployeeMasterCustomerCode +'/'+ this.Newprefix  +'/'+ this.NewemployeeMasterFirstName
                                                    +'/'+ this.NewemployeeMasterLastName +'/'+ this.NewemployeeMasterNickName +'/'+ this.NewemployeeMasterGender
                                                    +'/'+ this.NewmaritalStatus +'/'+ this.NewemployeeMasterBirthDate +'/'+ this.NewemployeeMasterPersonID
                                                    +'/'+ this.NewemployeeMasterTel1 +'/'+ this.NewempEmail +'/'+ this.NewempAddressReal +'/'+ this.NewempAddressPerson
                                                    +'/'+ this.NewemployeeMasterStartDate +'/'+ this.NewemployeePosition +'/'+ this.NewemployeeDepartment
                                                    +'/'+ this.NewemployeeType +'/'+ this.Neweducation +'/'+ this.Newbank +'/'+ this.NewbankNumber +'/'+ this.Newpassword ,{})
                                   .subscribe(
                                       data => {
                                           console.log('PUT Request is successful');
                                           alert("Edit Success!");
                                           window.location.reload(true);
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );
      }

}


