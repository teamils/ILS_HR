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

export interface employeeMasters{
    Fname : String;
    Lname : String;
    Dename : String;
    Poname : String;
}
export interface leave{
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

  public API = '//localhost:8080';
  employeeMasterCustomerCode : String;
  empID : Array<any>;
  dataLeave : Array<any>;
  nowDateToString : Array<string>;
  startDateToString : Array<string>;
  splitStartDate: Array<string>;

  leaveType : Array<any>;
  leaveTypeSelect : string;
  leaves : Array<any>;
  empId = localStorage.getItem('empId');
  displayedColumns: string[] = ['number','leaveType', 'startDate', 'endDate', 'startTime', 'endTime', 'reason', 'approvedBySupervisor', 'approvedByManager','leaveStatus','del'];
  dataSource = new MatTableDataSource<leave>(this.leaves);

  startDate : any;
  endDate : any;
  startTime : any;
  endTime : any;
  reason : any;

  table : any = {
      leaID : '',
      empCode : '',
      fName : '',
      lName : '',
      empDep : '',
      empPos : '',
      StartDate : '',
      sumDate : '',
  };

  leavetatelAll : any = {
      leavesNumbersID : '',
      totalAnnualLeave : '',
      totalSickLeave : '',
      totalOthersLeave : '',
      sumAllLeave : '',
  };

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
         ) { }

  ngOnInit() {
       setInterval(() => {
          if(this.leaveTypeSelect == "ลาครึ่งวัน"){
              this.xx = true;
          }
       }, 200);
      this.service.getLeaveType().subscribe(data => {
        this.leaveType = data;
        //console.log('leaveType -> ',this.leaveType);
      });
      //console.log(new Date());
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

              this.service.getShowLeaves(this.table.leaID).subscribe(data => {
                  if(data!=null){
                    this.leaves = data;
                    this.dataSource.data = this.leaves;
                    console.log('leaves -> ',this.leaves);
                  }
                  else console.log( this.table.fName,'--> ไม่มีการลาพักร้อน');
              });

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
                 this.SaveLeaveNumber();
        });

  }

    SubmitData(){
        //console.log('Sum Date = ',this.endDate);
         if(this.leaveTypeSelect == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.startDate == null) alert("กรุณาเลือกวันลา");
        else if(this.endDate == null) alert("กรุณาเลือกวันสิ้นสุดการลา");
        else if(this.reason == null) alert("กรุณากรอกหมายเหตุ");
        else{
             this.http.post(this.API  +/leave/+ this.table.leaID +'/'+ this.leaveTypeSelect +'/'+ this.startDate +'/'+ this.endDate +'/'+ this.startTime +'/'+ this.endTime +'/'+ this.reason  ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                      );
        }
    }

    leavecheck : Array<any>;
    totalAnnualLeave;
    SaveLeaveNumber(){ //function
                this.service.getShowLeavesNumber(this.empId).subscribe(data => {
                        if(data==null){
                            this.http.post(this.API  +/saveleaveNumber/+ this.empId +'/'+ this.table.sumDate ,{})
                               .subscribe(dataleaveNumber => {console.log('PUT Request is successful');},error => {console.log('Error', error);});
                        }
                        else{
                            this.leavecheck = data;
                            this.leavetatelAll.leavesNumbersID = data.leavesNumbersID;
                            this.leavetatelAll.totalAnnualLeave = data.totalAnnualLeave;
                            this.leavetatelAll.totalSickLeave = data.totalSickLeave;
                            this.leavetatelAll.totalOthersLeave = data.totalOthersLeave;
                            this.leavetatelAll.sumAllLeave = data.sumAllLeave;
                            //console.log('SaveLeaveNumber -> ',this.leavetatelAll.totalAnnualLeave);
                        }

                      });
    }


    CancelDataAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceCancelDialog, {
                  width: '320px',
                  height:'200px',
                  data: row,
            });
          }
    xx;
    SelectLeaveType(selectLeaveType:string){
      console.log('SelectLeaveType ->',selectLeaveType);
        if(selectLeaveType == "ลาครึ่งวัน"){
              this.endDate = new Date();
              this.startTime = "8:00 AM";
              this.endTime = "12:00 AM";
        }
        else{
            this.startTime = "8:00 AM";
            this.endTime = "5:00 PM";
        }
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
                                             window.location.reload(true);
                                              localStorage.setItem('links', 'attendance');
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );

        }


  }
