import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';

import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";

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
prefixSelect : String = '' ;
empMasterFirstName : null;
empMasterLastName : null;
empMasterNickName : null;
genderSelect : String = '' ;
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

typeNameSelect : '';
educationSelect : '';

NewBank: Array<any>;
bankSelect = '';

bankNumbers : null;

role_status : Array<any>;
role_statusSelect = '';
passwordCreate : null;


public API = '//localhost:8080/ILS_HR';   //for test

constructor(private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
            private http: HttpClient,
            private service:ServiceService,
           ) { }

    ngOnInit() {
        this.route.params.subscribe(prams=>{
                   this.data = prams
                   /*console.log(prams)*/
                 });
        this.service.getBank().subscribe(data => {
               this.NewBank = data;
               //console.log('NewBankSelect == ',this.NewBank);
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


    SubmitData(){
     if(this.employeeMasterCustomerCode == null || this.prefixSelect == null || this.empMasterFirstName == null
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
     this.http.post(this.API + '/'+this.employeeMasterCustomerCode + '/' + this.prefixSelect  + '/' + this.empMasterFirstName +'/' + this.empMasterLastName
     +'/' + this.empMasterNickName +'/' + this.genderSelect  +'/' + this.BirthDateSelect
     +'/' + this.personID +'/' + this.callContact +'/' + this.emails +'/' + this.homeNo +'/' + this.homeNowAddress
     +'/' + this.startWorks +'/' + this.positionSelect +'/' + this.departmentSelect +'/' + this.typeNameSelect
     +'/' + this.educationSelect +'/' + this.bankSelect +'/'+ this.bankNumbers +'/'+ this.role_statusSelect +'/'+ this.passwordCreate,{})
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
