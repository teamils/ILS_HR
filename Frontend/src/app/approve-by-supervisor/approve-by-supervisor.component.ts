import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../service/service.service';
import { ExcelService } from '../excel.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material';
import {  SelectionModel } from '@angular/cdk/collections';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { NewheaderComponent } from '../newheader/newheader.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { API1 } from '../app.component';
import { DatePipe } from '@angular/common';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";

export interface Emp{
    empCodeIDxx : number;
    employeeMasterCustomerCode : String;
}

@Component({
  selector: 'app-approve-by-supervisor',
  templateUrl: './approve-by-supervisor.component.html',
  styleUrls: ['./approve-by-supervisor.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})

export class ApproveBySupervisorComponent implements OnInit {
  leaves  : Array<any>;
  LeavesToComplete: Array<any>;
  leaveTypeForAlldays: Array<any>;
  isChecked;
  interval:any;
  interval2:any;
  interval3:any;
  leaveID;
  dis;
  empId = sessionStorage.getItem('empId');
  firstNameOnLogin = sessionStorage.getItem('fName');
  lastNameOnLogin  = sessionStorage.getItem('lName');
  departmentOnLogin = sessionStorage.getItem('departmentlogin');
  progressBar=false;
  dateAndTotel;
  dataToInput;
//------Search------------
  startDateSearch;
  endDateSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
  codeAndName;
//------------------------
  displayedColumns: string[] = ['number','employeeCode', 'name','department','date', 'leaveType','startDate', 'endDate','total','reason', /*'approvedBySupervisor', 'approvedByManager',*/'leaveStatus','approve','notApprove'];
  dataSource = new MatTableDataSource<Emp>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
             public datepipe: DatePipe) { }


  ngOnDestroy() {
      clearInterval(this.interval);
      clearInterval(this.interval2);
      clearInterval(this.interval3);
  }
  ngOnInit() {
      this.progressBar = true;
      this.interval3 = setInterval(() => {
        this.service.getLeavesToNotCompleteBySupervisor(this.empId).subscribe(data => {
             this.progressBar = false;
            this.leaves = data;
            this.dataSource.data = this.leaves;
            //console.log('leaves -> ',this.leaves);
            for(let i of this.leaves){
              i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
              i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
              i.createDate =  this.SplitCreateDate(i.createDate);
            }
        });
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
  onlyOdds = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 ;
  }
  SentEmail(element:any){
      //console.log(element);
      this.dateAndTotel = "ในวันที่ "+element.startDateForAllDay+" "+element.startTime+" น. ถึงวันที่ "+element.endDateForAllDay+" "+element.endTime+" น. รวม "+element.labelLeaveHalfDay;
      this.service.getDepartmentMasterRoleFindByDepartmentID(element.departmentid.departmentID).subscribe(data => {
            for(let i of data){
              this.dataToInput = {
                  managerID:i.employeeMasterid.employeeMasterID,
                  leaveType:element.leaveTypeForAllDay.leaveTypeForAlldayName,
                  empIdLeave:element.employeeMasterid.employeeMasterID,
                  supervisorID:this.empId,
                  dateAndTotel:this.dateAndTotel,
                  reason:element.reasonForAllDay,
              };
              if(i.employeeMasterid.roleStatus=='MANAGER'){ //Send To ...
                this.http.post(API1 + '/sendEmailToManager', JSON.stringify(this.dataToInput), {headers: {"Content-Type": "application/json"}
                   }).subscribe(data2 => {
                                  console.log('Send Email To '+i.employeeMasterid.employeeMasterNickName+' '+i.employeeMasterid.roleStatus+' '+i.departmentid.departmentName);
                               },error => {
                                   console.log('Error', error);
                               }
                );
              }
            }
      });

  }

  approve(row : any){
        this.progressBar = true;
        let startDate = row.startDateForAllDay+' '+row.startTime;
        let endDate = row.endDateForAllDay+' '+row.endTime;

        this.http.post(API1 + '/approveBySupervisor/' + row.leavesID +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin  ,{}).subscribe(data => {
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
      const dialogRef = this.dialog.open(ReasonNotApproveDialog, {
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
      this.http.get(API1+'/SearchLeaveInApproveSupByLeaveTypeLeaveStatusCodeName/' + this.empId +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch +'/'+ this.codeAndName,{})
                               .subscribe(data => {
                                  this.SetLeaves(data);
                               },error => {
                                  console.log('Error', error);
                               });
    }
    else{
      this.http.get(API1+'/SearchLeaveInApproveSupByStartDateToStartDate2AndAll/' + this.empId +'/'+ this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd') +'/'+ this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd') +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch  +'/'+ this.codeAndName,{})
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
    selector: 'reasonNotApprove',
    templateUrl: 'reasonNotApprove.html',
  })
  export class ReasonNotApproveDialog {
    leavesID: string;
    isActiveAttendance:string;
    reasonNotapprove=null;
    leavesNumbersid;
    diffDay;
    isPayment;

    constructor(public dialogRef: MatDialogRef<ReasonNotApproveDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public date: DialogData,private http: HttpClient){
         this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
        this.leavesNumbersid = this.date.leavesNumbersid.leavesNumbersID;
        this.diffDay = this.date.diffDay;
        this.isPayment = this.date.isPayment;

        //console.log(date);

    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    notApprove(){
        if(this.reasonNotapprove==null){
            alert("กรุณากรอกเหตุผล");
        }
        else{
          this.http.post(API1 + '/notApproveBySupervisor/' + this.leavesID +'/'+ this.reasonNotapprove,{}).subscribe(data => {
              this.CalculateLeaveNumberBack();
              console.log('Not approve is successful');
              alert("Not approve successful");

            },
            error => {
              console.log('Error', error);
            }
          );
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
