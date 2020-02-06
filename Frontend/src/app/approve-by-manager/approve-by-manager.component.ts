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
import { ReasonNotApproveDialog } from '../approve-by-supervisor/approve-by-supervisor.component';
import { API1 } from '../app.component';
import { DatePipe } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-approve-by-manager',
  templateUrl: './approve-by-manager.component.html',
  styleUrls: ['./approve-by-manager.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class ApproveByManagerComponent implements OnInit {
  leaves  : Array<any>;
  LeavesToComplete: Array<any>;
  departmentMasterRole: Array<any>;
  leaveTypeForAlldays: Array<any>;
  isChecked;
  intervalMan:any;
  interval2Man:any;
  interval3Man:any;
  leaveID;
  dis;
  progressBar=false;
  dataSearch='';
//------Search------------
  startDateSearch;
  endDateSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
  codeAndName;
//------------------------
  empId = sessionStorage.getItem('empId');
  firstNameOnLogin = sessionStorage.getItem('fName');
  lastNameOnLogin  = sessionStorage.getItem('lName');
  departmentOnLogin = sessionStorage.getItem('departmentlogin');

  displayedColumns: string[] = ['number','employeeCode', 'name','department','date', 'leaveType', 'startDate', 'endDate','total', 'reason', /*'approvedBySupervisor', 'approvedByManager',*/'leaveStatus','approve','notApprove'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  constructor(private service:ServiceService,
              private router:Router,
              private route:ActivatedRoute ,
              public dialog: MatDialog,
               private http: HttpClient,
                public datepipe: DatePipe) { }

  ngOnDestroy() {
      clearInterval(this.intervalMan);
      clearInterval(this.interval2Man);
      clearInterval(this.interval3Man);
  }

  ngOnInit() {
        this.progressBar = true;
        this.interval3Man = setInterval(() => {
          this.service.getShowLeavesNotApproveBySup(this.empId).subscribe(data => {
              //console.log('leaves -> ', data.leaveStatus);
              this.leaves = data;
              this.dataSource.data = this.leaves;
              this.progressBar = false;
              for(let i of this.leaves){
                i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                i.createDate =  this.SplitCreateDate(i.createDate);
              }
              //console.log('leaves -> ',this.leaves);
          });
          this.dataSource.paginator = this.paginator;
        }, 1000);
      this.service.getleaveTypeForAlldays().subscribe(data => {
          this.leaveTypeForAlldays = data;
          //console.table(this.leaveTypeForAlldays);
      });
  }
  SplitCreateDate(date:any){
    var DateSplitted = date.split("T");
    var DateSplitted2 = DateSplitted[0].split("-");
    var TimeSplitted = DateSplitted[1].split(".");
    return DateSplitted2[2] +"-"+ DateSplitted2[1] +"-"+ DateSplitted2[0] +" "+ TimeSplitted[0];
  }
  SplitDate(date:any){
    var DateSplitted = date.split("-");
    return DateSplitted[2] +"-"+ DateSplitted[1] +"-"+ DateSplitted[0];
  }

  approve(row : any){
        this.progressBar = true;
        this.http.post(API1 + '/approveByManager/' + row.leavesID +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin  ,{}).subscribe(data => {
            console.log('Approve is successful');
            alert("Approve successful");
            this.progressBar = false;
          },
          error => {
            console.log('Error', error);
          }
        );
  }
  notApprove(row : any){
      const dialogRef = this.dialog.open(ReasonNotApproveBygerDialog, {
                  width: '360px',
                  height:'270px',
                  data: row,
            });
  }

  ShowSearchLeaveData(){
      this.hide = !this.hide;
      if(this.hide==false){
          this.startDateSearch=null;
          this.endDateSearch=null;
          this.leaveTypeSearch=null;
          this.leaveStatusSearch=null;
          this.codeAndName=null;
      }
  }

  SetLeaves(data:any){
                this.progressBar = false;
                this.leaves = data;
                this.dataSource.data = this.leaves;
                for(let i of this.leaves){
                  i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                  i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                  i.createDate =  this.SplitCreateDate(i.createDate);
                }
      this.ngOnDestroy();
  }

  SearchLeaveData(){
    this.progressBar = true;
    this.ngOnDestroy();
    if(this.startDateSearch == null && this.endDateSearch == null){
      this.http.get(API1+'/SearchLeaveInApproveManagerByLeaveTypeLeaveStatusCodeName/' + this.empId +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch +'/'+ this.codeAndName,{})
                               .subscribe(data => {
                                  this.SetLeaves(data);
                               },error => {
                                  console.log('Error', error);
                               });
    }
    else{
      this.http.get(API1+'/SearchLeaveInApproveManagerByStartDateToStartDate2AndAll/' + this.empId +'/'+ this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd') +'/'+ this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd') +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch  +'/'+ this.codeAndName,{})
                               .subscribe(data => {
                                  this.SetLeaves(data);
                               },error => {
                                  console.log('Error', error);
                               });
    }
  }


}


//Dialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
  leavesNumbersid;
  diffDay;
  isPayment;
}
@Component({
    selector: 'reasonNotApprovebyger',
    templateUrl: 'reasonNotApprovebyger.html',
  })

export class ReasonNotApproveBygerDialog {

    leavesID: string;
    isActiveAttendance:string;
    reasonNotapprove=null;
    leavesNumbersid;
    diffDay;
    isPayment;
    constructor(public dialogRef: MatDialogRef<ReasonNotApproveBygerDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public date: DialogData,private http: HttpClient){
         this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
        this.leavesNumbersid = this.date.leavesNumbersid.leavesNumbersID;
        this.diffDay = this.date.diffDay;
        this.isPayment = this.date.isPayment;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

   notApprove(){
        if(this.reasonNotapprove==null){
            alert("กรุณากรอกเหตุผล");
        }
        else{
          this.http.post(API1 + '/notApproveByManager/' + this.leavesID +'/'+ this.reasonNotapprove,{}).subscribe(data => {
              this.CalculateLeaveNumberBack();
              console.log('Not approve is successful');
              alert("Not approve successful");
            },
            error => {
              console.log('Error', error);
            }
          );
          //this.ss.onChange();
          this.dialogRef.close();
        }
    }

    CalculateLeaveNumberBack(){
        if(this.isPayment=='payment'){
            this.http.post(API1 + '/CalculateLeaveNumberBack/' + this.leavesNumbersid +'/'+ this.diffDay +'/'+ this.leavesID,{})
                                       .subscribe(
                                           data => {
                                               console.log('CalculateLeaveNumberBack is successful',data);
                                                this.dialogRef.close();
                                           },
                                           error => {
                                               console.log('Error', error);
                                           }
                                        );
        }

    }



}
