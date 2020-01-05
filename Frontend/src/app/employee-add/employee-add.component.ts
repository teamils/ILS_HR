import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';

import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
  providers: [
  {
    provide: DateAdapter, useClass: AppDateAdapter
  },
  {
    provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
  }
  ]
})

export class EmployeeAddComponent implements OnInit {


data:any={}

employeeMasterCustomerCode : null;
prefix: Array<any>;
prefixSelect = '';
empMasterFirstName : null;
empMasterLastName : null;
empMasterNickName : null;
gender:Array<any>;
genderSelect = '';


BirthDateSelect : String = '' ;

personID : null;
callContact : null;
emails : null;
homeNo : null;
homeNowAddress : null;

startWorks : null;

position: Array<any>;
positionSelect : '';

department: Array<any>;
departmentSelect : '';
employeeType: Array<any>;
typeNameSelect : '';
education: Array<any>;
educationSelect : '';
emergencyContact :'';
NewBank: Array<any>;
bankSelect = '';

bankNumbers : null;

role_status : Array<any>;
role_statusSelect = '';
passwordCreate : null;
x:any=false;
empId = localStorage.getItem('empId');
fName = localStorage.getItem('fName');
lName = localStorage.getItem('lName');

constructor(private route:ActivatedRoute ,
            public dialog: MatDialog,
            private http: HttpClient,
            private service:ServiceService,
            public api : AppComponent) { }
    public API3 = this.api.API;

    ngOnInit() {
        this.route.params.subscribe(prams=>{
                   this.data = prams
                   /*console.log(prams)*/
                 });
        this.service.getBank().subscribe(data => {
               this.NewBank = data;
               //console.log('NewBankSelect == ',this.NewBank);
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
        this.service.getDepartment().subscribe(data => {
               this.department = data;
               //console.log('department == ',this.department);
                 });
        this.service.getPosition().subscribe(data => {
               this.position = data;
               //console.log('position == ',this.position);
                 });
        this.service.getRoleStatus().subscribe(data => {
               this.role_status = data;
               //console.log(this.role_status);
          });

    }

    subtractYear:number;
    sumDate;
    diffTime1:number;
    diffDay:number;
    CalculateLeaveDate(date1:any,date2:any){
        this.diffTime1 = (date2 - date1);
        this.diffDay = Math.ceil((this.diffTime1 / (1000 * 60 * 60 * 24)-1));
        this.subtractYear = this.diffDay/365;
        console.log('subtractYear =>',this.subtractYear);
    }

    SubmitData(){
        this.CalculateLeaveDate(this.BirthDateSelect,new Date());
       if(this.subtractYear < 18){
          alert("ต้องมีอายุ 18ปีบริบูรณ์");
        }
       else if(this.employeeMasterCustomerCode == null || this.prefixSelect == null || this.empMasterFirstName == null
        || this.empMasterLastName == null
         || this.genderSelect == null
          || this.BirthDateSelect == null || this.personID == null
           || this.callContact == null
            || this.homeNo == null || this.homeNowAddress == null
             || this.startWorks == null || this.positionSelect == null
              || this.departmentSelect == null || this.typeNameSelect == null
               || this.educationSelect == null || this.bankSelect == null
                || this.bankNumbers == null || this.role_statusSelect == null){
                              alert("กรุณากรอกข้อมูลให้ครบ");
        }

        else{
       this.http.post(this.API3 + /ILS_HR/ + this.employeeMasterCustomerCode + '/' + this.prefixSelect  + '/' + this.empMasterFirstName +'/' + this.empMasterLastName
       +'/' + this.empMasterNickName +'/' + this.genderSelect  +'/' + this.BirthDateSelect
       +'/' + this.personID +'/' + this.callContact +'/' + this.emails +'/' + this.homeNo +'/' + this.homeNowAddress +'/'+ this.emergencyContact
       +'/' + this.startWorks +'/' + this.positionSelect +'/' + this.departmentSelect +'/' + this.typeNameSelect
       +'/' + this.educationSelect +'/' + this.bankSelect +'/'+ this.bankNumbers +'/'+ this.role_statusSelect +'/'+ this.passwordCreate +'/'+ this.fName +'/'+ this.lName,{})
                  .subscribe(
                                 data => {
                                     console.log('PUT Request is successful', data);
                                     alert("บันทึกสำเร็จ");
                                     window.location.reload(true);
                                      localStorage.setItem('links', 'employeeMaster');
                                 },
                                 error => {
                                     console.log('Error', error);
                                 }
                   );
          }

    }






}
