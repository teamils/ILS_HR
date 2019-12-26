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

  leaveNumber : Array<any>;
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
          console.log('SaveLeaveNumber -> ',this.leaveNumber);
      });
  }

}


