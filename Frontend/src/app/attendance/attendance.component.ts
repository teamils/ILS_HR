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

  leave : any = {
      leavesID : '',
      leavesDate : '',
      reason : '',
      startDate : '',
      endDate : '',
      startTime : '',
      endTime : '',
      approvedBySupervisor : '',
      approvedByManager : '',
      isActiveAttendance : '',
      leaveType : '',
      totalAnnualLeave : '',
  };

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
         ) { }

  ngOnInit() {
      this.service.getLeaveType().subscribe(data => {
        this.leaveType = data;
        //console.log('leaveType -> ',this.leaveType);
      });
      //console.log(new Date());



            this.service.getSearchEmployeeForAttendance2(this.empId).subscribe(data1 => {
              console.log('data1->',data1);
              this.table.leaID = data1.employeeMasterID;
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
                    //console.log('leaves -> ',this.leaves);
                    console.log('totalAnnualLeave -> ',data.totalAnnualLeave);
                    this.leave.leavesID = data.leavesID;
                    this.leave.leavesDate = data.leavesDate;
                    this.leave.reason = data.reason;
                    this.leave.startDate = data.startDate;
                    this.leave.endDate = data.endDate;
                    this.leave.startTime = data.startTime;
                    this.leave.endTime = data.endTime;
                    this.leave.approvedBySupervisor = data.approvedBySupervisor;
                    this.leave.approvedByManager = data.approvedByManager;
                    this.leave.isActiveAttendance = data.isActiveAttendance;
                    this.leave.leaveType = data.leaveType;
                    this.leave.totalAnnualLeave = data.totalAnnualLeave;

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

               this.http.post(this.API + '/savetotalAnnualLeave/' + this.table.leaID +'/'+ this.table.sumDate ,{}).subscribe(
                                         data => {
                                             console.log('PUT Request is successful');
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                );



        });
  }





    startDate : '';
    endDate : '';
    startTime : '';
    endTime : '';
    reason : '';
    SubmitData(){
        //console.log('Sum Date = ',this.table.leaID);
        if(this.employeeMasterCustomerCode == null) alert("กรุณาใส่รหัสพนักงาน");
        else if(this.leaveTypeSelect == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.startDate == null) alert("กรุณาเลือกวันลา");
        else if(this.endDate == null) alert("กรุณาเลือกวันสิ้นสุดการลา");
        else if(this.reason == null) alert("กรุณากรอกหมายเหตุ");
        else{
            console.log('startDate', this.startDate);
                  console.log('startTime', this.startTime);
             this.http.post(this.API  +'/'+ this.table.leaID +'/'+ this.leaveTypeSelect +'/'+ this.startDate +'/'+ this.endDate +'/'+ this.startTime +'/'+ this.endTime +'/'+ this.reason +'/'+ this.table.sumDate ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            window.location.reload(true);
                                            localStorage.setItem('links', 'attendanceData');
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                      );
        }
    }


    CalculateLeave(){
      this.nowDateToString = new Date().toString().split(" ");
      //this.splitStartDate = this.startDate.split(" ");
      if(this.leaveTypeSelect == 'ลาครึ่งวัน'){
          console.log(this.startDate);
          console.log(parseInt(this.nowDateToString[2]));
      }

    }






}
