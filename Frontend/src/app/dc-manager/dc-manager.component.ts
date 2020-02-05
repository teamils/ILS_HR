import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { API1 } from '../app.component';
import {FormControl} from '@angular/forms';
import { AttendanceComponent } from '../attendance/attendance.component';
import { ExcelService } from '../excel.service';

export interface PeriodicElement {
  leavesID: any;
  createDate: any;
  updateLeave_date: any;
  updateLeave_by: any;
  createLeave_by: any;
  labelLeaveHalfDay: any;
  reasonForAllDay: any;
  startDateForAllDay: any;
  endDateForAllDay: any;
  startTime: any;
  endTime: any;
  leaveTypeForAllDay: any;
  approvedBySupervisor: any;
  approvedByManager: any;
  confirmByHR: any;
  isActiveAttendance: any;
  employeeMasterid: any;
  leaveStatus: any;
  reasonNotApprove: any;
  isPayment: any;
  paymentReson: any;
  leavesNumbersid: any;
  departmentid: any;
}
@Component({
  selector: 'app-dc-manager',
  templateUrl: './dc-manager.component.html',
  styleUrls: ['./dc-manager.component.css']
})
export class DcManagerComponent implements OnInit {

  leaves  : Array<any>;
  department: Array<any>;
  departmentSelect:any;
  LeavesToComplete: Array<any>;
  isChecked;
  interval:any;
  interval2:any;
  interval3:any;
  dis;
  dataSearch='';
  progressBar=false;
  firstNameOnLogin = localStorage.getItem('fName');
  lastNameOnLogin  = localStorage.getItem('lName');
  empId = localStorage.getItem('empId');
  displayedColumns: string[] = ['number','employeeCode', 'name','position','department'/*,'employeeType'*/,'date', 'leaveType','startDate', 'endDate','total','reason'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;


  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
             private excelService:ExcelService) { }

  ngOnDestroy() {
      clearInterval(this.interval);
      clearInterval(this.interval2);
      clearInterval(this.interval3);
  }

  ngOnInit() {
    this.progressBar = true;
        this.interval3 = setInterval(() => {
          this.service.getLeaveAtManager().subscribe(data => {
                this.progressBar = false;
                this.leaves = data;
                this.dataSource.data = this.leaves;
                for(let i of this.leaves){
                  i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                  i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                }
                //console.log('leaves -> ',this.leaves);
          });
        }, 1000);
        this.service.getDepartment().subscribe(data => {
               this.department = data;
              //console.log('department == ',this.department);
        });
        this.dataSource.paginator = this.paginator;
  }
  SplitDate(date:any){
    var DateSplitted = date.split("-");
    return DateSplitted[2] +"-"+ DateSplitted[1] +"-"+ DateSplitted[0];
  }

  SearchLeaveAtManager(){
    this.ngOnDestroy();
      this.service.getSearchLeaveAtManager(this.dataSearch).subscribe(data => {
              this.leaves = data;
              this.dataSource.data = this.leaves;
              for(let i of this.leaves){
                i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
              }
      });
  }

  SearchInputNull(){
    this.ngOnDestroy();
    //console.log(this.dataSearch);
    if(this.dataSearch==''){
      this.ngOnInit();
      this.progressBar = false;
    }
  }
}