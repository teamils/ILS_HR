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
import { API1 } from '../app.component';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceShowLeavenumberComponent } from '../attendance-show-leavenumber/attendance-show-leavenumber.component';

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
  providers: [DatePipe,
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
    leavesNumbersID: '',
    getDay : '',
    usedDay : '',
    BalanceDay: '',
    CompoundDay : '',
  };

  employeeMasterCustomerCode : String;
  empID : Array<any>;
  dataLeave : Array<any>;
  startDate : any;
  endDate : any;
  startTimeSelect='null';
  endTimeSelect='null';
  reason : any;
  labelLeaveHalfDay: any;
    startDate2 : any;
    endDate2 : any;
    reason2 : any;
    leaveTypeSelect2 : string;
  day="วัน";
  leaveNumber : Array<any>;
  totalAnnualLeave;
  leaveType : Array<any>;
  leaveTypeForAlldays : Array<any>;
  leaveTypeSelect : string;
  leaves2 : Array<any>;
  masterAttendance:Array<any>;
  interval:any;
  diffTime1:number;
  diffDay:number;
  dis:true;
  hourdis;
  nowdate:Date;
  todayDate:Date;
  diffTime2:number;
  sumDay:number;
  sumDay_365:number;
  x:any=false;
  diff;
  dataToInput:any;
  dateAndTotel;
  statusLabelLeaveHalfDay;
  empId = localStorage.getItem('empId');
  startDateInLogin = localStorage.getItem('startDateInLogin');
  departmentIDLogin = localStorage.getItem('departmentIDLogin');


  displayedColumns2: string[] = ['number','date','leaveType','startDate','endDate2','total', 'reason', /*'approvedBySupervisor', 'approvedByManager',*/'reasonNotApprove','isPayment','leaveStatus','del'];
  dataSource2 = new MatTableDataSource<leave2>(this.leaves2);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public datepipe: DatePipe) { }


  ngOnDestroy() {
      clearInterval(this.interval);
  }

  ngOnInit() {
      var CDate = new Date(this.startDateInLogin);
      this.CalculateStartWorkDate(CDate,new Date());

      this.x=true;
      this.service.getleaveTypeForAlldays().subscribe(data => {
        this.leaveTypeForAlldays = data;
        this.x=false;
        //console.table(this.leaveTypeForAlldays);
      });
        this.interval = setInterval(() => {
            this.service.getSearchEmployeeForAttendance2(this.empId).subscribe(data1 => {
              //console.log('data1->',data1);
              this.table.leaID = this.empId;
              this.table.empCode = data1.employeeMasterCustomerCode;
              this.table.fName = data1.employeeMasterFirstName;
              this.table.lName = data1.employeeMasterLastName;
              this.table.empDep = data1.departmentid.departmentName;
              this.table.empPos = data1.employeePosition;

              this.SaveLeaveNumber();

              this.service.getShowLeaves2(this.table.leaID).subscribe(dataleave => {
                    this.leaves2 = dataleave;
                    //console.log('leaves2 -> ', this.leaves2);
                    this.dataSource2.data = this.leaves2;
                    this.dataSource2.paginator = this.paginator;
                    for(let i of this.leaves2){
                      i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                      i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                    }
              });
            });
        }, 1000);
  }

  SplitDate(date:any){
    var DateSplitted = date.split("-");
    return DateSplitted[2] +"-"+ DateSplitted[1] +"-"+ DateSplitted[0];
  }

  RefreshTable(){
             setTimeout(() => {  //show table Leave
                this.service.getShowLeaves2(this.table.leaID).subscribe(data => {
                    this.leaves2 = data;
                    this.dataSource2.data = this.leaves2;
                    this.dataSource2.paginator = this.paginator;
                    //console.log('leaves2 -> ',this.leaves2);
                });
                this.service.getSearchEmployeeForAttendance2(this.empId).subscribe(data1 => {
                  //console.log('data1->',data1);
                  this.table.leaID = this.empId;
                  this.table.empCode = data1.employeeMasterCustomerCode;
                  this.table.fName = data1.employeeMasterFirstName;
                  this.table.lName = data1.employeeMasterLastName;
                  this.table.empDep = data1.employeeDepartment;
                  this.table.empPos = data1.employeePosition;
                  this.service.getShowLeaves2(this.table.leaID).subscribe(dataleave => {
                        this.leaves2 = dataleave;
                        this.dataSource2.data = this.leaves2;
                        this.dataSource2.paginator = this.paginator;
                        //console.log('leaves2 -> ',this.leaves2);
                  });
                });
             }, 1000);
  }
  totalTime:any;
  totalHour:number;
  totalMinute:number;
  totalMinute2:number;
  startHour;
  startMinute;
  EndHour;
  EndMinute;
  splitStartTime:Array<any>;
  splitEndTime:Array<any>;
  total:any;
  CalculateLeaveTime(){
      this.splitStartTime = this.startTimeSelect.split(":")
      this.startHour = parseInt(this.splitStartTime[0]);
      this.startMinute = parseInt(this.splitStartTime[1]);
      this.splitEndTime = this.endTimeSelect.split(":")
      this.EndHour = parseInt(this.splitEndTime[0]);
      this.EndMinute = parseInt(this.splitEndTime[1]);
      this.totalHour = this.EndHour - this.startHour;
      this.totalMinute = this.EndMinute - this.startMinute
      if(this.totalMinute<0) this.totalMinute2=this.totalMinute*(-1);
      this.total = this.totalHour+'.'+this.totalMinute2;
      //console.log(this.total,'ชั่วโมง');
    setTimeout(() => {
      this.http.post(API1  +/Time/+ this.startTimeSelect +'/'+ this.endTimeSelect ,{})
                        .subscribe(
                                       data => {
                                           console.log(data);
                                            this.totalTime = data;
                                       },
                                       error => {}
      );
    }, 100);
  }

  SubmitData(){ // Half Day
        this.CalculateLeaveTime();
        this.Checktheleave(this.table.leaID,this.leaveTypeSelect);
        if(this.labelLeaveHalfDay=='ชั่วโมง') this.statusLabelLeaveHalfDay=1;
        else this.statusLabelLeaveHalfDay=0;

        if(this.leaveTypeSelect == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.labelLeaveHalfDay == null) alert("กรุณาเลือกเช้า-เย็น");
        else if(this.labelLeaveHalfDay=='ชั่วโมง' && this.startTimeSelect == 'null') alert("กรุณาเลือกเวลาเริ่มต้น");
        else if(this.labelLeaveHalfDay=='ชั่วโมง' && this.endTimeSelect == 'null') alert("กรุณาเลือกเวลาสิ้นสุด");
        else if(this.totalHour<0 || (this.totalHour==0&&this.totalMinute<=0)) alert("กรุณาเลือกเวลาให้ถูกต้อง");
        else if(this.startDate == null) alert("กรุณาเลือกวันลา");
        else if(this.reason == null) alert("กรุณากรอกเหตุผล");
        else{
             this.http.post(API1  +/SaveLeaveHalfDay/+ this.table.leaID +'/'+ this.leaveTypeSelect
                              +'/'+ this.labelLeaveHalfDay +'/'+ this.startDate  +'/'+ this.reason +'/'+
                              this.startTimeSelect +'/'+ this.endTimeSelect +'/'+ this.totalTime +'/'+
                              this.statusLabelLeaveHalfDay +'/'+ this.departmentIDLogin +'/'+ this.leavetatelAll.leavesNumbersID,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                            this.x=false;
                                            //this.SentEmail(this.leaveTypeSelect,this.startDate,this.startDate,this.startTimeSelect,this.endTimeSelect,this.totalTime,'ชั่วโมง');
                                            this.ClearTextInput();
                                       },
                                       error => {
                                          alert("ไม่สำเร็จ กรุณาลองใหม่");
                                          window.location.reload(true);
                                           console.log('Error', error);
                                       }
                                      );

            //this. RefreshTable();
            this.x=true;
        }
  }

  SubmitData2(){ //Full day
        this.CalculateLeaveDate(this.startDate2,this.endDate2);
        this.Checktheleave(this.table.leaID,this.leaveTypeSelect2);
        if(this.diffDay<1){
          this.startDate2  = null;
          this.endDate2  = null;
        }
        else if(this.leaveTypeSelect2 == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.startDate2 == null) alert("กรุณาเลือกวันลา");
        else if(this.endDate2 == null) alert("กรุณาเลือกวันสิ้นสุดการลา");
        else if(this.reason2 == null) alert("กรุณากรอกเหตุผล");
        else if(this.diffDay>this.leavetatelAll.BalanceDay && this.leavetatelAll.BalanceDay != 0){
            this.diff = this.diffDay-this.leavetatelAll.BalanceDay;
            alert("*คุณมีวัน"+this.leaveTypeSelect2+" = "+this.leavetatelAll.BalanceDay+"วัน\n"+"หากคุณต้องการ"+this.leaveTypeSelect2+" "+this.diffDay+"วัน คุณต้องคีย์ลา "+this.leavetatelAll.BalanceDay+"วัน หนึ่งครั้งและ "+this.diff+"วัน อีกหนึ่งครั้ง!");
        }
        else{
             this.http.post(API1  +/SaveLeaveFullDay/+ this.table.leaID +'/'+ this.leaveTypeSelect2 +'/'+ this.startDate2 +'/'+  this.endDate2 +'/'+ this.reason2 +'/'+ this.diffDay +'/'+ this.leavetatelAll.leavesNumbersID +'/'+ this.departmentIDLogin ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert(this.leaveTypeSelect2+"ลา "+this.diffDay+" วัน สำเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                            //this.SentEmail(this.leaveTypeSelect2,this.startDate2,this.endDate2,'8:00','17:00',0,'วัน');
                                            this.x=false;
                                            this.ClearTextInput();
                                       },
                                       error => {
                                          console.log('Error', error);
                                          alert("ไม่สำเร็จ กรุณาลองใหม่");
                                          window.location.reload(true);
                                       }
                                      );
             //this.ClearTextInput();
              //this.RefreshTable();
              this.x=true;
        }

  }

  SentEmail(leaveType:any,startdate:any,enddate:any,statTime:any,endTime:any,totalTime:any,type:any){
        if(totalTime==0)
           this.dateAndTotel = "ในวันที่ "+this.datepipe.transform(startdate, 'dd/MM/yyyy')+" "+statTime+" น. ถึงวันที่ "+this.datepipe.transform(enddate, 'dd/MM/yyyy')+" "+endTime+" น. รวมเป็นเวลา "+this.diffDay+" "+type;
        else
          this.dateAndTotel = "ในวันที่ "+this.datepipe.transform(startdate, 'dd/MM/yyyy')+" "+statTime+" น. ถึงวันที่ "+this.datepipe.transform(enddate, 'dd/MM/yyyy')+" "+endTime+" น. รวมเป็นเวลา "+this.totalTime+" "+type;

        this.service.getDepartmentMasterRoleFindByDepartmentID(this.departmentIDLogin).subscribe(data => {
           // console.log(data);
          for(let i of data){
            if(i.usePosition=="supervisor"){
              this.dataToInput = {
                  managerID:i.employeeMasterid.employeeMasterID,
                  leaveType:leaveType,
                  empID:this.empId,
                  dateAndTotel:this.dateAndTotel,
              };
              this.http.post(API1 + '/sendEmail', JSON.stringify(this.dataToInput), {headers: {"Content-Type": "application/json"}
                   }).subscribe(data2 => {
                                  console.log("Sent Email is successfull");
                               },error => {
                                   console.log('Error', error);
                               }
              );
            }
          }
        });
  }

    SaveLeaveNumber(){ //function
           //console.log('work year ปัดเศษลง =>',this.sumDay_365);
           this.service.getShowLeavesNumber(this.empId).subscribe(data => {
                //console.table(data);
                if(data.length==0){
                        this.http.post(API1  +/saveleaveNumber/+ this.empId +'/'+ this.sumDay_365 +'/'+ this.leaveTypeForAlldays.length +'/'+ this.table.fName +'/'+ this.table.lName ,{})
                               .subscribe(dataleaveNumber => {
                                  console.log('PUT Request is successful');
                                  window.location.reload(true);
                               },error => {
                                  console.log('Error', error);
                               });
                }
                else{
                    this.leaveNumber = data;
                    //console.log('SaveLeaveNumber -> ',this.leavecheck);
                }

          });

    }

    CancelDataAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceCancelDialog, {
                  width: '320px',
                  height:'200px',
                  data: row,
            });
            //this.RefreshTable();
    }
    ShowLeaveNumberDailog(){
            const dialogRef = this.dialog.open(AttendanceShowLeavenumberComponent, {
                  width: 'auto;',
                  height:'auto;',
            });
            //this.RefreshTable();
    }

    CalculateLeaveDate(date1:any,date2:any){
        this.diffTime1 = (date2 - date1);
        this.diffDay = Math.ceil((this.diffTime1 / (1000 * 60 * 60 * 24))+1);
        //console.log('Leave Day =>',this.diffDay);
    }

    sortEggsInNest(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    num:Array<any> = [];
    CalculateStartWorkDate(date1:any,date2:any){
        this.diffTime2 = (date2 - date1);
        this.sumDay = Math.ceil((this.diffTime2 / (1000 * 60 * 60 * 24))-1);
        //console.log('start work =>',this.sumDay);
        this.sumDay_365 = this.sumDay/365.0;
        //console.log('work year =>',this.sumDay_365);
        this.service.getMasterAttendance().subscribe(data => {
            this.masterAttendance = data;
            //console.log('masterAttendance == ',this.masterAttendance);
            for(let i=0;i<data.length;i++){
                this.num[i] = data[i].year;
            }
            this.num.sort(this.sortEggsInNest);
            for(let i=0;i<this.num.length;i++){
                if(this.sumDay_365<this.num[i]){
                    this.sumDay_365 = this.num[i-1];
                    break;
                }
                else if(this.sumDay_365>this.num[this.num.length-1]){
                    this.sumDay_365 = this.num[this.num.length-1];
                    break;
                }
            }
        });

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

    Checktheleave(empID1:any,leaveType1:any){ //checkว่าสามาถรลาได้มั้ยเมื่อเทียบกับวันลาที่มี
      setTimeout(() => {
         this.service.show1rowof1person(empID1,leaveType1).subscribe(data => {
          //console.log('show1rowof1person -> ',data);
          for (let i of data) {
              this.leavetatelAll.leavesNumbersID = i.leavesNumbersID;
              this.leavetatelAll.BalanceDay = i.balanceDay;
          }
        });
      }, 100);
    }

    SettingTime(){
      setTimeout(() => {
          //console.log(this.labelLeaveHalfDay);
          if(this.labelLeaveHalfDay=='ชั่วโมง'){
            this.startTimeSelect = 'null';
            this.endTimeSelect = 'null';
            this.hourdis = true;
          }
          else if(this.labelLeaveHalfDay=='ครึ่งวันเช้า'){
            this.startTimeSelect = '08:00';
            this.endTimeSelect = '12:00';
            this.hourdis = false;
          }
          else if(this.labelLeaveHalfDay=='ครึ่งวันบ่าย'){
            this.startTimeSelect = '13:00';
            this.endTimeSelect = '17:00';
            this.hourdis = false;
          }
      }, 100);
    }

}

//Dialog AttendanceCancelDialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
}
@Component({
    selector: 'attendanceDelete',
    templateUrl: 'attendanceDelete.html',
  })
  export class AttendanceCancelDialog {
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
               this.http.post(API1 + '/CancelLeave/' + this.leavesID ,{})
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

