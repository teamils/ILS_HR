import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-attendance-show-leavenumber',
  templateUrl: './attendance-show-leavenumber.component.html',
  styleUrls: ['./attendance-show-leavenumber.component.css']
})

export class AttendanceShowLeavenumberComponent implements OnInit {
  public API = '//localhost:8080';
  leaveNumber : Array<any>;
  leave : Array<any>;
  employeeID;
  count:number=0;
  empId = localStorage.getItem('empId');
  constructor(public dialogRef: MatDialogRef<AttendanceShowLeavenumberComponent>
                      ,hangeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient) { }


  ngOnInit() {
      this.service.getShowLeavesNumber(this.empId).subscribe(data => {
          this.leaveNumber = data;
          //console.log('SaveLeaveNumber -> ',this.leaveNumber);
      });
      this.service.getShowLeaves2(this.empId).subscribe(data => {
          this.leave = data;
          //console.log('leave -> ',this.leave);
      });
      /*setTimeout(() => {
          this.employeeID = this.leave[0].employeeMasterid.employeeMasterID;
           console.log('employeeID=>',this.employeeID);
          for(let i=0;i<this.leave.length;i++){
              if(this.leave[i].wageStatus==1) this.count++;
              console.log('leave=>',this.leave[i].leaveTypeForAllDay);
          }
          console.log('count =>',this.count);


          this.http.post(this.API1  +/SaveLeaveNumber2/+ this.employeeID +'/'+ this.leaveTypeSelect +'/'+ this.labelLeaveHalfDay   ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                      );
      }, 1000);*/


  }

}


