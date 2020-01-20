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
  selector: 'app-attendance-data',
  templateUrl: './attendance-data.component.html',
  styleUrls: ['./attendance-data.component.css']
})
export class AttendanceDataComponent implements OnInit {
  leaves  : Array<any>;
  department: Array<any>;
  departmentSelect:any;
  LeavesToComplete: Array<any>;
  isChecked;
  interval:any;
  interval2:any;
  dis;
  dataSearch;
  progressBar=false;
  firstNameOnLogin = localStorage.getItem('fName');
  lastNameOnLogin  = localStorage.getItem('lName');
  empId = localStorage.getItem('empId');
  displayedColumns: string[] = ['number','employeeCode', 'name','position','department'/*,'employeeType'*/,'date', 'leaveType','startDate', 'endDate','total','reason', 'approvedBySupervisor', 'approvedByManager','reasonNotApprove','isPayment','leaveStatus','confirm','del'/*,'edit'*/];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
             private excelService:ExcelService) { }


  ngOnDestroy() {
    if (this.interval) { // show table Leave
      clearInterval(this.interval);
    }
    if (this.interval2) { // show table Leave
      clearInterval(this.interval2);
    }
  }
  ngOnInit() {
        this.progressBar = true;
        //this.interval2 = setInterval(() => {
          this.onChange();
        //}, 1000);
        this.service.getDepartment().subscribe(data => {
               this.department = data;
              //console.log('department == ',this.department);
        });
        this.dataSource.paginator = this.paginator;

  }

          DeleteAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceDeleteDialog, {
                  width: '320px',
                  height:'200px',
                  data: row,
            });
            this.onChange();
          }
        onChange(){
          //this.progressBar = true;
           this.interval = setTimeout(() => {  //show table Leave
              if(this.isChecked == true){
                this.dis=true;
                this.service.getshowLeavesToComplete().subscribe(dataLeavesToComplete => {
                      this.progressBar = false;
                      this.leaves = dataLeavesToComplete;
                      this.dataSource.data = this.leaves;
                      //console.log('leaves -> ',this.leaves);
                });
              }
              else if(this.isChecked == false){
                this.dis=false;
                  this.service.getshowLeavesToNotComplete().subscribe(data => {
                    this.progressBar = false;
                    this.leaves = data;
                    this.dataSource.data = this.leaves;
                    //console.log('leaves -> ',this.leaves);
                  });
              }
            }, 1000);
        }

    SearchEmployeeByCodeAndName(){
      this.service.getSearchEmployeeByCodeAndName(this.dataSearch).subscribe(data => {
              this.leaves = data;
              this.dataSource.data = this.leaves;
      });
    }
    SearchEmployeeByCodeAndName2(){
      this.service.getSearchEmployeeByCodeAndName2(this.dataSearch).subscribe(data => {
              this.leaves = data;
              this.dataSource.data = this.leaves;
      });
    }
    SearchEmployeeByDepartmentID(){
      this.service.getSearchEmployeeByDepartmentID(this.departmentSelect).subscribe(data => {
              //console.log(data);
              this.leaves = data;
              this.dataSource.data = this.leaves;
              this.dataSearch=null;
      });
    }
    getEditPaymentDialog(row : any){
            const dialogRef = this.dialog.open(EditPaymentDialog, {
                  width: 'auto',
                  height:'auto',
                  data: row,
            });
            //this.onChange();

    }
    GetExportDataDailog(){
            const dialogRef = this.dialog.open(ExportDataDialog, {
                  width: 'auto',
                  height:'auto',
            });
            //this.onChange();
    }
    exportexcel(): void{
        let dataleave : any[] = [];
        for(let i = 0 ; i < this.leaves.length ; i++){
            dataleave.push({
              สำดับ : i+1,
              วันที่เขียนใบลา : this.leaves[i].createDate,
              start_date : this.leaves[i].startDateForAllDay+" "+this.leaves[i].startTime,
              end_date : this.leaves[i].endDateForAllDay+" "+this.leaves[i].endTime,
              ประเภทการลา : this.leaves[i].leaveTypeForAllDay.leaveTypeForAlldayName,
              จำนวนวันลา : this.leaves[i].labelLeaveHalfDay,
              payment : this.leaves[i].isPayment,
              เหตุผล : this.leaves[i].reasonForAllDay,
              Approve_by_supervisor : this.leaves[i].approvedBySupervisor,
              Approve_by_manager : this.leaves[i].approvedByManager,
            });
        }
        this.excelService.exportAsExcelFile(dataleave, 'Dataleave');
    }
}

//Dialog ExportDataDialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
}
@Component({
    selector: 'exportDataDialog',
    templateUrl: 'exportDataDialog.html',
  })
  export class ExportDataDialog {
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;

    constructor(public dialogRef: MatDialogRef<ExportDataDialog>,
                public service:ServiceService,
                @Inject(MAT_DIALOG_DATA)  public date: DialogData,
                private http: HttpClient){
          dialogRef.disableClose = false;

    }

    closeDialog(): void {
      this.dialogRef.close();
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
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;

    constructor(public dialogRef: MatDialogRef<AttendanceDeleteDialog>,
                public service:ServiceService,
                @Inject(MAT_DIALOG_DATA)  public date: DialogData,
                private http: HttpClient){
          dialogRef.disableClose = true;
        this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    DeleteAttendance(){
               this.http.post(API1 + '/deleteAttendance/' + this.leavesID ,{})
                                     .subscribe(
                                         data => {
                                             console.log('PUT Request is successful');
                                              this.dialogRef.close();
                                             //window.location.reload(true);
                                              localStorage.setItem('links', 'attendanceData');
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );

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
    empId = localStorage.getItem('empId');
    firstNameOnLogin = localStorage.getItem('fName');
    lastNameOnLogin  = localStorage.getItem('lName');
    leaves: Array<any>;
    leavesID: string;
    employeeMasterFirstName='';
    employeeMasterLastName='';
    isPayments:string='';
    labelLeaveHalfDay='';
    leaveTypeForAllDay='';
    balanceDay;
    diffDay:String;
    splitted;
    diffShowFrontend;
    paymentReson:String=null;
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
            //console.log('leaves -> ',this.leaves);
            this.isPayments = data.isPayment;
            this.labelLeaveHalfDay = data.labelLeaveHalfDay
            this.leaveTypeForAllDay = data.leaveTypeForAllDay.leaveTypeForAlldayName;
            this.leavesNumbersID = data.leavesNumbersid.leavesNumbersID;

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
        if(this.isPayments=="payment"){
             this.UpdateLeaveNumber();
        }
        else{}
    }

    UpdateLeaveNumber(){
        this.http.post(API1 + '/UpdateLeaveNumber/' + this.leavesNumbersID +'/'+ this.diffDay  +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin +'/'+ this.statusLabelLeaveHalfDay ,{}).subscribe(
          dataupdate => {
            console.log('Update Leave Number is successful');
          },
            error => {console.log('Error', error);}
        );
    }



  }
