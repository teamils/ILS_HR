import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppComponent } from '../app.component';

export interface employeeMasters{
    Fname : String;
    Lname : String;
    Dename : String;
    Poname : String;
}
export interface leave{
    leavesID : String;
}
export interface leave2{
    leavesID : String;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]

})
export class AttendanceComponent implements OnInit {
  table : any = {
    leaID : '',
    empCode : '',
    fName : '',
    lName : '',
    empDep : '',
    empPos : '',
    StartDate : '',
    sumDate : '',
    status:'',
  };

  leavetatelAll : any = {
    leaveTypeForAllDay: '',
    leavesNumbersID : '',
    totalAnnualLeave : '',
    sumAnnualLeave: '',
    totalSickLeave : '',
    sumSickLeave: '',
    totalOthersLeave : '',
    sumOthersLeave: '',
    sumAllLeave : '',
  };

  employeeMasterCustomerCode : String;
  empID : Array<any>;
  dataLeave : Array<any>;
  nowDateToString : Array<string>;
  startDateToString : Array<string>;
  splitStartDate: Array<string>;

  startDate : any;
  endDate : any;
  startTimeSelect=null;
  endTimeSelect=null;
  reason : any;
  labelLeaveHalfDay: any;
    startDate2 : any;
    endDate2 : any;
    reason2 : any;
    leaveTypeSelect2 : string;

  leavecheck : Array<any>;
  totalAnnualLeave;
  leaveType : Array<any>;
  leaveTypeForAlldays : Array<any>;
  leaveTypeSelect : string;
  leaves2 : Array<any>;
  interval2:any;
  diffTime1:number;
  diffDay:number;
  dis:true;
  hourdis;

  empId = localStorage.getItem('empId');

  displayedColumns2: string[] = ['number','date','leaveType', 'reason','startDate','endDate2','total', 'approvedBySupervisor', 'approvedByManager','reasonNotApprove','leaveStatus','del'];
  dataSource2 = new MatTableDataSource<leave2>(this.leaves2);

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public api : AppComponent) { }
    public API1 = this.api.API;

  ngOnDestroy() {
    if (this.interval2) { // show table Leave
      clearInterval(this.interval2);
    }
  }

  ngOnInit() {
      this.service.getLeaveType().subscribe(data => {
        this.leaveType = data;
        //console.log('leaveType -> ',this.leaveType);
      });
      this.service.getleaveTypeForAlldays().subscribe(data => {
        this.leaveTypeForAlldays = data;
        //console.log('leaveTypeForAlldays -> ',this.leaveTypeForAlldays);
      });

            this.service.getSearchEmployeeForAttendance2(this.empId).subscribe(data1 => {
              //console.log('data1->',data1);
              this.table.leaID = this.empId;
              this.table.empCode = data1.employeeMasterCustomerCode;
              this.table.fName = data1.employeeMasterFirstName;
              this.table.lName = data1.employeeMasterLastName;
              this.table.empDep = data1.employeeDepartment;
              this.table.empPos = data1.employeePosition;


              this.nowDateToString = new Date().toString().split(" ");
              //console.log(parseInt(this.nowDateToString[3]));
              this.table.StartDate = data1.employeeMasterStartDate;
              this.startDateToString = this.table.StartDate.toString().split("-");
              //console.log(parseInt(this.startDateToString[0]));
              this.table.sumDate = parseInt(this.nowDateToString[3]) - parseInt(this.startDateToString[0]);
              //console.log(this.table.sumDate);

                 if(this.table.sumDate >= 10){
                      this.table.sumDate = 15;
                }
                else if(this.table.sumDate >= 5){
                      this.table.sumDate = 12;
                }
                else if(this.table.sumDate >= 3){
                      this.table.sumDate = 10;
                }
                else if(this.table.sumDate >= 1){
                      this.table.sumDate = 7;
                }
                else {
                      this.table.sumDate = 0;
                }
                 //this.SaveLeaveNumber();
              this.service.getShowLeaves2(this.table.leaID).subscribe(dataleave => {
                    this.leaves2 = dataleave;
                    this.dataSource2.data = this.leaves2;
                    this.leavetatelAll.leaveTypeForAllDay = dataleave.leaveTypeForAllDay;
                    //console.log('leaves2 -> ',this.leaves2);

                });
        });
  }
  RefreshTable(){
     this.interval2 = setTimeout(() => {  //show table Leave
                this.service.getShowLeaves2(this.table.leaID).subscribe(data => {
                    this.leaves2 = data;
                    this.dataSource2.data = this.leaves2;
                    //console.log('leaves2 -> ',this.leaves2);
                });
             }, 1000);
  }
    SubmitData(){ // Half Day
        if(this.leaveTypeSelect == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.labelLeaveHalfDay == null) alert("กรุณาเลือกเช้า-เย็น");
        else if(this.startDate == null) alert("กรุณาเลือกวันลา");
        else if(this.reason == null) alert("กรุณากรอกเหตุผล");
        else{
             this.http.post(this.API1  +/SaveLeaveHalfDay/+ this.table.leaID +'/'+ this.leaveTypeSelect +'/'+ this.labelLeaveHalfDay +'/'+ this.startDate  +'/'+ this.reason +'/'+ this.startTimeSelect +'/'+ this.endTimeSelect,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                      );
            this.ClearTextInput();
            this. RefreshTable();
        }
    }
    SubmitData2(){ //Full day

            this.CalculateLeaveDate();

        if(this.diffDay<1){
          this.startDate2  = null;
          this.endDate2  = null;
        }
        else if(this.leaveTypeSelect2 == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.startDate2 == null) alert("กรุณาเลือกวันลา");
        else if(this.endDate2 == null) alert("กรุณาเลือกวันสิ้นสุดการลา");
        else if(this.reason2 == null) alert("กรุณากรอกเหตุผล");
        else{
             this.http.post(this.API1  +/SaveLeaveFullDay/+ this.table.leaID +'/'+ this.leaveTypeSelect2 +'/'+ this.startDate2 +'/'+  this.endDate2 +'/'+ this.reason2 +'/'+ this.diffDay ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                      );
             this.ClearTextInput();
              this. RefreshTable();
        }

    }



    /*SaveLeaveNumber(){ //function
                this.service.getShowLeavesNumber(this.empId).subscribe(data => {
                        if(data==null){
                            this.http.post(this.API1  +/saveleaveNumber/+ this.empId +'/'+ this.table.sumDate ,{})
                               .subscribe(dataleaveNumber => {console.log('PUT Request is successful');},error => {console.log('Error', error);});
                        }
                        else if(data!=null){
                            this.leavecheck = data;
                            this.leavetatelAll.leavesNumbersID = data.leavesNumbersID;
                            this.leavetatelAll.totalAnnualLeave = data.totalAnnualLeave;
                            this.leavetatelAll.sumAnnualLeave = data.sumAnnualLeave;
                            this.leavetatelAll.totalSickLeave = data.totalSickLeave;
                            this.leavetatelAll.sumSickLeave = data.sumSickLeave;
                            this.leavetatelAll.totalOthersLeave = data.totalOthersLeave;
                            this.leavetatelAll.sumOthersLeave = data.sumOthersLeave;
                            this.leavetatelAll.sumAllLeave = data.sumAllLeave;
                            //console.log('SaveLeaveNumber -> ',this.leavetatelAll.totalAnnualLeave);
                        }
                         if(this.leavetatelAll.totalAnnualLeave != this.table.sumDate || this.leavetatelAll.totalSickLeave != 30){


                        }

                      });
    }*/


    CancelDataAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceCancelDialog, {
                  width: '320px',
                  height:'200px',
                  data: row,
            });
            this.RefreshTable();
    }

    CalculateLeaveDate(){
        this.diffTime1 = (this.endDate2 - this.startDate2);
        this.diffDay = Math.ceil((this.diffTime1 / (1000 * 60 * 60 * 24))+1);
        console.log(this.diffDay);
    }

    ClearTextInput(){
        this.leaveTypeSelect="";
        this.leaveTypeSelect2="";
        this.startDate="";
        this.startDate2="";
        this.endDate2="";
        this.reason = "";
        this.reason2 = "";
        this.labelLeaveHalfDay="";
        this.startTimeSelect="";
        this.endTimeSelect="";
    }




}

//Dialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
}
@Component({
    selector: 'attendanceDelete',
    templateUrl: 'attendanceDelete.html',
  })
  export class AttendanceCancelDialog {
    public API = '//localhost:8080/';
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;

    constructor(public dialogRef: MatDialogRef<AttendanceCancelDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public date: DialogData,private http: HttpClient){
          dialogRef.disableClose = true;
        this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    DeleteAttendance(){
               this.http.post(this.API + '/CancelLeave/' + this.leavesID ,{})
                                     .subscribe(
                                         data => {
                                             console.log('PUT Request is successful');
                                             //window.location.reload(true);
                                              this.dialogRef.close();
                                              localStorage.setItem('links', 'attendance');

                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );

        }


  }
