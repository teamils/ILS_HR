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
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { DatePipe } from '@angular/common';

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
  selector: 'app-attendance-data',
  templateUrl: './attendance-data.component.html',
  styleUrls: ['./attendance-data.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class AttendanceDataComponent implements OnInit {
  leaves  : Array<any>;
  department: Array<any>;
  departmentSelect:any;
  LeavesToComplete: Array<any>;
  leaveTypeForAlldays: Array<any>;
  isChecked;
  interval:any;
  interval2:any;
  interval3:any;
  dis;
  dataSearch='';
  progressBar=false;
  firstNameOnLogin = sessionStorage.getItem('fName');
  lastNameOnLogin  = sessionStorage.getItem('lName');
  empId = sessionStorage.getItem('empId');
//------Search------------
  startDateSearch;
  endDateSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
  leavePayment;
  departmentSearch;
  codeAndName;
//------------------------
  displayedColumns: string[] = ['number','employeeCode', 'name','position','department'/*,'employeeType'*/,'date', 'leaveType','startDate', 'endDate','total','reason', 'approvedBySupervisor', 'approvedByManager','reasonNotApprove','isPayment','leaveStatus','confirm','del'/*,'edit'*/];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
             private excelService:ExcelService,
              public datepipe: DatePipe) { }

  ngOnDestroy() {
      clearInterval(this.interval);
      clearInterval(this.interval2);
      clearInterval(this.interval3);
  }
  ngOnInit() {
        this.progressBar = true;
        this.interval3 = setInterval(() => {
          this.service.getshowLeavesToNotComplete().subscribe(data => {
                this.progressBar = false;
                this.leaves = data;
                this.dataSource.data = this.leaves;
                for(let i of this.leaves){
                  i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                  i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                  i.createDate =  this.SplitCreateDate(i.createDate);
                }
                //console.log('leaves -> ',this.leaves);
          });
        }, 1000);
        this.service.getDepartment().subscribe(data => {
               this.department = data;
              //console.log('department == ',this.department);
        });
        this.service.getleaveTypeForAlldays().subscribe(data => {
          this.leaveTypeForAlldays = data;
          //console.table(this.leaveTypeForAlldays);
        });
        this.dataSource.paginator = this.paginator;

  }
  onlyOdds = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 ;
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
        onChange(){
            this.dataSearch=null;
            this.departmentSelect=null;
           this.progressBar = true;
              if(this.isChecked == true){
                clearInterval(this.interval2);
                clearInterval(this.interval3);
                this.dis=true;
                this.interval = setInterval(() => {
                  this.service.getshowLeavesToComplete().subscribe(dataLeavesToComplete => {
                        this.progressBar = false;
                        this.leaves = dataLeavesToComplete;
                        this.dataSource.data = this.leaves;
                        for(let i of this.leaves){
                          i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                          i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        }
                        //console.log('leaves -> ',this.leaves);
                  });
                }, 1000);
              }
              else if(this.isChecked == false){
                clearInterval(this.interval);
                clearInterval(this.interval3);
                this.dis=false;
                this.interval2 = setInterval(() => {
                  this.service.getshowLeavesToNotComplete().subscribe(data => {
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
              }
        }
    SearchInputNull(){
      //console.log(this.dataSearch);
      if(this.dataSearch==''){
          this.onChange();
          this.progressBar = false;
      }
    }

    DeleteAttendance(row : any){
        const dialogRef = this.dialog.open(AttendanceDeleteDialog, {
            width: '320px',
            height:'250px',
            data: row,
        });
        //this.onChange();
    }
    getEditPaymentDialog(row : any){
            const dialogRef = this.dialog.open(EditPaymentDialog, {
                  width: 'auto',
                  height:'auto',
                  data: row,
            });
            //this.onChange();
    }

    exportexcel(): void{
        let dataleave : any[] = [];
        for(let i = 0 ; i < this.leaves.length ; i++){
            dataleave.push({
              สำดับ : i+1,
              ชื่อ_สกุล : this.leaves[i].employeeMasterid.employeeMasterFirstName+"  "+this.leaves[i].employeeMasterid.employeeMasterLastName,
              ตำแหน่ง : this.leaves[i].employeeMasterid.employeePosition,
              แผนก : this.leaves[i].employeeMasterid.departmentid.departmentName,
              วันที่เขียนใบลา : this.leaves[i].createDate,
              วันที่เริ่มลา : this.leaves[i].startDateForAllDay+" "+this.leaves[i].startTime,
              ลาถึงวันที่ : this.leaves[i].endDateForAllDay+" "+this.leaves[i].endTime,
              ประเภทการลา : this.leaves[i].leaveTypeForAllDay.leaveTypeForAlldayName,
              ระยะเวลาที่ลา : this.leaves[i].labelLeaveHalfDay,
              เหตุผล : this.leaves[i].reasonForAllDay,
              หัวหน้างานอนุมัติ : this.leaves[i].approvedBySupervisor,
              ผู้จัดการอนุมัติ : this.leaves[i].approvedByManager,
              HR_ยืนยัน : this.leaves[i].confirmByHR,
              จ่ายเงิน : this.leaves[i].isPayment,
              สถานะการลา : this.leaves[i].leaveStatus,
            });
        }
        this.excelService.exportAsExcelFile(dataleave, 'Dataleave');
    }


  ShowSearchLeaveData(){
      this.hide = !this.hide;
      if(this.hide==false){
          this.startDateSearch=null;
          this.endDateSearch=null;
          this.leaveTypeSearch=null;
          this.leaveStatusSearch=null;
          this.leavePayment=null;
          this.departmentSearch=null;
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
      this.http.get(API1+'/SearchLeaveByDepartmentLeaveTypeLeaveStatusIspaymentCodeandName' +'/'+ this.departmentSearch +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch +'/'+ this.leavePayment +'/'+ this.codeAndName,{})
                               .subscribe(data => {
                                  this.SetLeaves(data);
                               },error => {
                                  console.log('Error', error);
                               });
    }
    else{
      this.http.get(API1+'/SearchLeaveByStartDateToStartDate2AndAll' +'/'+ this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd') +'/'+ this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd') +'/'+ this.departmentSearch +'/'+ this.leaveTypeSearch +'/'+ this.leaveStatusSearch +'/'+ this.leavePayment +'/'+ this.codeAndName,{})
                               .subscribe(data => {
                                  this.SetLeaves(data);
                               },error => {
                                  console.log('Error', error);
                               });
    }
  }

}


//Dialog AttendanceDeleteDialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
}
@Component({
    selector: 'attendanceDelete',
    templateUrl: 'attendanceDelete.html',
  })
  export class AttendanceDeleteDialog {
    leaves;
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;
    reasonNotapprove;
    constructor(public dialogRef: MatDialogRef<AttendanceDeleteDialog>,
                public service:ServiceService,
                @Inject(MAT_DIALOG_DATA)  public date: DialogData,
                private http: HttpClient){
          dialogRef.disableClose = true;
        this.leaves = this.date;
        this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
        //console.log(this.leaves);
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    DeleteAttendance(){
        if(this.leaves.leaveStatus=='Complete'){
            if(this.leaves.isPayment=='payment'){
                    this.http.post(API1 + '/CalculateLeaveNumberBack3/' + this.leaves.leavesNumbersid.leavesNumbersID +'/'+ this.leaves.diffDay +'/'+ this.leaves.leavesID,{})
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
        else{
            if(this.reasonNotapprove==null) alert("กรุณากรอกเหตุผล");
            else{
              this.http.post(API1 + '/deleteAttendance/' + this.leavesID +'/'+ this.reasonNotapprove ,{})
                                     .subscribe(
                                         data => {
                                             console.log('CancelAttendance is successful');
                                              this.dialogRef.close();
                                             //window.location.reload(true);
                                              sessionStorage.setItem('links', 'attendanceData');
                                            this.http.post(API1 + '/CalculateLeaveNumberBack3/' + this.leaves.leavesNumbersid.leavesNumbersID +'/'+ this.leaves.diffDay +'/'+ this.leaves.leavesID,{})
                                             .subscribe(
                                                 data => {
                                                     console.log('CalculateLeaveNumberBack is successful',data);
                                                      this.dialogRef.close();
                                                 },
                                                 error => {
                                                     console.log('Error', error);
                                                 }
                                              );
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );
            }
        }
    }

  }




//Dialog EditPayment
export interface EditPaymentDialogData {
  leavesID : null;
  isActiveAttendance: string;
}

@Component({
    selector: 'editPayment',
    templateUrl: 'editPayment.html',
  })
  export class EditPaymentDialog {
    empId = sessionStorage.getItem('empId');
    firstNameOnLogin = sessionStorage.getItem('fName');
    lastNameOnLogin  = sessionStorage.getItem('lName');
    leaves: Array<any>;
    leavesID: string;
    employeeMasterFirstName='';
    employeeMasterLastName='';
    isPayments:string='';
    labelLeaveHalfDay='';
    leaveTypeForAllDay='';
    leaveTypeForAllDayID='';
    balanceDay;
    diffDay:String;
    diffDay2;
    splitted;
    diffShowFrontend;
    paymentReson=null;
    statusLabelLeaveHalfDay:any;
    leavesNumbersID=null;
    test;
    constructor(public dialogRef: MatDialogRef<EditPaymentDialog> ,
                public service:ServiceService,
                private http: HttpClient,
                @Inject(MAT_DIALOG_DATA)  public data: EditPaymentDialogData){
          dialogRef.disableClose = true;
          this.leavesID = this.data.leavesID;

        this.service.getLeavesFindByID(this.leavesID).subscribe(data => {
            this.leaves = data;
            console.log('leaves -> ',this.leaves);
            this.isPayments = data.isPayment;
            this.labelLeaveHalfDay = data.labelLeaveHalfDay
            this.leaveTypeForAllDay = data.leaveTypeForAllDay.leaveTypeForAlldayName;
            this.leaveTypeForAllDayID = data.leaveTypeForAllDay.leaveTypeForAlldayID;
            this.leavesNumbersID = data.leavesNumbersid.leavesNumbersID;
            this.diffDay2 = data.diffDay;

            if(data.leavesNumbersid.balanceDay>0)
            this.balanceDay = data.leavesNumbersid.balanceDay;
            else this.balanceDay=0;
            this.splitted = data.labelLeaveHalfDay.split(" ");
            this.diffDay = this.splitted[0];
            this.diffShowFrontend = this.splitted[0].toString();
              if(this.splitted[1]=='ชั่วโมง'){
                this.test='ชั่วโมง';
                this.statusLabelLeaveHalfDay = 1;
              }
              else if(this.splitted[1]=='ว'){
                this.test='วัน';
                this.statusLabelLeaveHalfDay = 2;
              }
              else{
                this.test='';
                this.statusLabelLeaveHalfDay = 3;
              }
            this.employeeMasterFirstName = data.employeeMasterid.employeeMasterFirstName;
            this.employeeMasterLastName = data.employeeMasterid.employeeMasterLastName;
            console.log('diffDay -> ',this.diffDay);
            console.log('statusLabelLeaveHalfDay ->',this.statusLabelLeaveHalfDay);
        });
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    ConfirmByHR(){
        this.http.post(API1 + '/confirmByHR/' + this.leavesID +'/'+ this.isPayments +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin +'/'+ this.paymentReson ,{}).subscribe(data => {
            //console.log('Approve is successful');
            alert("Confirm successful");
             this.dialogRef.close();
          },
          error => {
            console.log('Error', error);
          }
        );
        if(this.isPayments=="not payment"){
                this.http.post(API1 + '/CalculateLeaveNumberBack2/' + this.leavesNumbersID +'/'+ this.diffDay2 +'/'+ this.leavesID,{})
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

    UpdateLeaveNumber(){
        this.http.post(API1 + '/UpdateLeaveNumber/' + this.leavesNumbersID +'/'+ this.diffDay +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin +'/'+ this.statusLabelLeaveHalfDay +'/'+  this.leaveTypeForAllDayID ,{}).subscribe(
          dataupdate => {
            console.log('Update Leave Number is successful');
          },
            error => {console.log('Error', error);}
        );
    }

    CalculateLeaveNumberBack(){
        this.http.post(API1 + '/CalculateLeaveNumberBack/' + this.leavesNumbersID +'/'+ this.diffDay2 +'/'+ this.leavesID,{})
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
