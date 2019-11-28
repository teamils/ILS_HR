import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {

  data:any={}

  employee : Array<any>;
  employeeSelect : '';

  statusSelect : String = '' ;
  userCreate : null;
  passwordCreate : null;

  public API = '//localhost:8080/ILS_HR';   //for test
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,) { }

  ngOnInit() {
        this.service.getemployee().subscribe(data => {
               this.employee = data;
               console.log(this.employee);
          });

  }

 SubmitData(){
       if(this.employeeSelect == null || this.statusSelect == null || this.userCreate == null || this.passwordCreate == null){
        alert("กรุณากรอกข้อมูลให้ครบ");
      }
    else{
     this.http.post(this.API  +'/'+ this.employeeSelect +'/'+ this.statusSelect +'/'+ this.userCreate +'/'+ this.passwordCreate ,{})
                .subscribe(
                               data => {
                                   console.log('PUT Request is successful', data);
                                   alert("บันทึกสำเร็จ");
                                  this.router.navigate(['employee-master',{first:this.data.first}]);
                               },
                               error => {
                                   console.log('Error', error);
                               }
                              );
      }
    }

}
