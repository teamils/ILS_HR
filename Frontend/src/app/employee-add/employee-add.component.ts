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
MaritalStatusSelect : String = '' ;
BirthDateSelect : String = '' ;

personID : null;
callContact : null;
emails : null;
homeNo : null;
homeNowAddress : null;

startWorks : null;
positionSelect : '';
departmentSelect : '';
typeNameSelect : '';
educationSelect : '';
bankSelect : '';
bankNumbers : null;


public API = '//localhost:8080/ILS_HR';   //for test

constructor(private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
           ) { }

    ngOnInit() {
        this.route.params.subscribe(prams=>{
                   this.data = prams
                   console.log(prams)
                 });
    }


    SubmitData(){
     if(this.employeeMasterCustomerCode == null || this.prefixSelect == null || this.empMasterFirstName == null
      || this.empMasterLastName == null || this.empMasterNickName == null
       || this.genderSelect == null || this.MaritalStatusSelect == null
        || this.BirthDateSelect == null || this.personID == null
         || this.callContact == null || this.emails == null
          || this.homeNo == null || this.homeNowAddress == null
           || this.startWorks == null || this.positionSelect == null
            || this.departmentSelect == null || this.typeNameSelect == null
             || this.educationSelect == null || this.bankSelect == null
              || this.bankNumbers == null){
                            alert("กรุณากรอกข้อมูลให้ครบ");
      }
      else{
     this.http.post(this.API + '/'+this.employeeMasterCustomerCode + '/' + this.prefixSelect + '/' + this.empMasterFirstName +'/' + this.empMasterLastName
     +'/' + this.empMasterNickName +'/' + this.genderSelect +'/' + this.MaritalStatusSelect +'/' + this.BirthDateSelect
     +'/' + this.personID +'/' + this.callContact +'/' + this.emails +'/' + this.homeNo +'/' + this.homeNowAddress
     +'/' + this.startWorks +'/' + this.positionSelect +'/' + this.departmentSelect +'/' + this.typeNameSelect
     +'/' + this.educationSelect +'/' + this.bankSelect +'/' + this.bankNumbers,{})
                .subscribe(
                               data => {
                                   console.log('PUT Request is successful', data);
                                   alert("บันทึกสำเร็จ");
                                   window.location.reload(true);

                               },
                               error => {
                                   console.log('Error', error);
                               }
                 );

        }
      }





}
