import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { API1 } from '../app.component';

export interface DialogData {
  employeeMasterid;
}
@Component({
  selector: 'app-attendance-show-leavenumber',
  templateUrl: './attendance-show-leavenumber.component.html',
  styleUrls: ['./attendance-show-leavenumber.component.css']
})

export class AttendanceShowLeavenumberComponent implements OnInit {
  leaveNumber : Array<any>;
  leave : Array<any>;
  employeeID;
  count:number=0;
  empId = sessionStorage.getItem('empId');
  constructor(public dialogRef: MatDialogRef<AttendanceShowLeavenumberComponent>
                      ,hangeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient
                      ,@Inject(MAT_DIALOG_DATA)  public data: DialogData) { }

  ngOnInit() {

      if(this.data == null){
        this.service.getShowLeavesNumber(this.empId).subscribe(data => {
            this.leaveNumber = data;
            //console.log('SaveLeaveNumber -> ',this.leaveNumber);
        });
      }
      else {
        this.service.getShowLeavesNumber(this.data.employeeMasterid.employeeMasterID).subscribe(data => {
            this.leaveNumber = data;
            //console.log('SaveLeaveNumber -> ',this.leaveNumber);
        });
      }

  }

}


