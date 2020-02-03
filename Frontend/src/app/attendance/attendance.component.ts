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
    employeeMasterGender:'',
    roleStatus:'',
  };

  leavetatelAll : any = {
    leavesNumbersID: '',
    getDay : '',
    usedDay : '',
    BalanceDay: '',
    CompoundDay : '',
    leaveTypeID:'',
    checkDisabled:'',
  };

  empId = localStorage.getItem('empId');
  startDateInLogin = localStorage.getItem('startDateInLogin');
  departmentIDLogin = localStorage.getItem('departmentIDLogin');
  firstNameOnLogin = localStorage.getItem('fName');
  lastNameOnLogin  = localStorage.getItem('lName');
  roleStatusInLogin  = localStorage.getItem('roleStatusInLogin');
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
  statusLabelLeaveHalfDay2;
  empRole;
  statusVacationLeave=false;
  disLeave=false;
//------Search------------
  startDateSearch;
  endDateSearch;
  checkboxSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
//------------------------
  displayedColumns2: string[] = ['number','date','leaveType','startDate','endDate2','total', 'reason', /*'approvedBySupervisor', 'approvedByManager',*/'reasonNotApprove','isPayment','leaveStatus','del'];
  dataSource2 = new MatTableDataSource<leave2>(this.leaves2);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public datepipe: DatePipe) { }

  onlyOdds = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 ;
  }

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
              this.table.employeeMasterGender = data1.employeeMasterGender;
              this.table.roleStatus = data1.roleStatus;
              this.SaveLeaveNumber();

              this.service.getShowLeaves2(this.table.leaID).subscribe(dataleave => {
                    this.leaves2 = dataleave;
                    //console.log('getShowLeaves2 -> ', this.leaves2);
                    this.dataSource2.data = this.leaves2;
                    this.dataSource2.paginator = this.paginator;
                    for(let i of this.leaves2){
                      i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                      i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                      i.createDate =  this.SplitCreateDate(i.createDate);
                    }
              });
            });
        }, 1000);

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
                  this.table.roleStatus = data1.roleStatus;
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
                                            return data;
                                       },
                                       error => {}
      );
    }, 100);
    return this.totalTime;
  }

 CheckDoublyLeaves_HalfDay(leaveType:any,startDate:any,startTime:any,endTime:any){
    for(let i of this.leaves2){
      if(i.leaveStatus!='Cancel'){
        //console.log(i);
        startDate = this.datepipe.transform(startDate, 'dd-MM-yyyy')
        if(leaveType==i.leaveTypeForAllDay.leaveTypeForAlldayName && startDate==i.startDateForAllDay && startDate==i.endDateForAllDay && startTime==i.startTime && endTime==i.endTime ){
            return 0;
        }
      }
    }
    return 1;
  }
  SubmitData(){ // Half Day
        let totalTime = this.CalculateLeaveTime();
        this.CalculateLeaveDate(this.startDate,this.startDate);
        this.Checktheleave(this.table.leaID,this.leaveTypeSelect);
          if(this.labelLeaveHalfDay=='ชั่วโมง') {this.statusLabelLeaveHalfDay=1;this.statusLabelLeaveHalfDay2=1;}
          else{this.statusLabelLeaveHalfDay=0;this.statusLabelLeaveHalfDay2=3;}
        if(this.leaveTypeSelect == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.labelLeaveHalfDay == null) alert("กรุณาเลือกเช้า-เย็น");
        else if(this.labelLeaveHalfDay=='ชั่วโมง' && this.startTimeSelect == 'null') alert("กรุณาเลือกเวลาเริ่มต้น");
        else if(this.labelLeaveHalfDay=='ชั่วโมง' && this.endTimeSelect == 'null') alert("กรุณาเลือกเวลาสิ้นสุด");
        else if(this.totalHour<0 || (this.totalHour==0&&this.totalMinute<=0)) alert("กรุณาเลือกเวลาให้ถูกต้อง");
        else if(this.startDate == null) alert("กรุณาเลือกวันลา");
        else if(this.reason == null) alert("กรุณากรอกเหตุผล");
        else if(this.diffDay>this.leavetatelAll.BalanceDay && this.leavetatelAll.BalanceDay != 0 ){
            this.diff = this.diffDay-this.leavetatelAll.BalanceDay;
            alert("*คุณมีวัน"+this.leaveTypeSelect+" = "+this.leavetatelAll.BalanceDay+"ชั่วโมง\n"+"หากคุณต้องการ"+this.leaveTypeSelect+" "+totalTime+"ชั่วโมง คุณต้องคีย์ลา "+this.leavetatelAll.BalanceDay+"ชั่วโมง หนึ่งครั้งและ "+totalTime+"ชั่วโมง อีกหนึ่งครั้ง!");
        }
        else{
            let CheckDoublyLeaves_HalfDay = this.CheckDoublyLeaves_HalfDay(this.leaveTypeSelect,this.startDate,this.startTimeSelect,this.endTimeSelect);
            if(CheckDoublyLeaves_HalfDay==0) alert("วันที่และเวลา ที่คุณเลือกมีการลาแล้ว กรุณาตรวจสอบอีกครั้ง!");
            else{
              this.http.post(API1  +'/SaveLeaveHalfDay/'+ this.table.leaID +'/'+ this.leaveTypeSelect
                              +'/'+ this.labelLeaveHalfDay +'/'+ this.startDate  +'/'+ this.reason +'/'+
                              this.startTimeSelect +'/'+ this.endTimeSelect +'/'+ totalTime +'/'+
                              this.statusLabelLeaveHalfDay2 +'/'+ this.departmentIDLogin +'/'+ this.leavetatelAll.leavesNumbersID,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert("ลาสําเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                            this.x=false;
                                            this.SentEmail(this.leaveTypeSelect,this.startDate,this.startDate,this.startTimeSelect,this.endTimeSelect,this.totalTime,'ชั่วโมง',this.reason);
                                            this.ClearTextInput();
                                            this.UpdateLeaveNumber(totalTime);
                                       },
                                       error => {
                                          alert("ไม่สำเร็จ กรุณาลองใหม่");
                                          window.location.reload(true);
                                           console.log('Error', error);
                                       }
                                      );
              this.x=true;
            }
        }
  }

  CheckDoublyLeaves_Fullday(leaveType:any,startDate:any,endDate:any){
    for(let i of this.leaves2){
      if(i.leaveStatus!='Cancel'){
        //console.log(i);
        startDate = this.datepipe.transform(startDate, 'dd-MM-yyyy')
        endDate = this.datepipe.transform(endDate, 'dd-MM-yyyy')
        if(leaveType==i.leaveTypeForAllDay.leaveTypeForAlldayName && startDate==i.startDateForAllDay && endDate==i.endDateForAllDay ){
            return 0;
        }
      }
    }
    return 1;
  }

  SubmitData2(){ //Full day
        this.statusLabelLeaveHalfDay2=2;
        this.CalculateLeaveDate(this.startDate2,this.endDate2);
        this.Checktheleave(this.table.leaID,this.leaveTypeSelect2);
        if(this.diffDay<1){
          this.startDate2  = null;
          this.endDate2  = null;
          this.diffDay=0;
        }
        else if(this.leaveTypeSelect2 == null)  alert("กรุณาเลือกประเภทการลา");
        else if(this.startDate2 == null) alert("กรุณาเลือกวันลา");
        else if(this.endDate2 == null) alert("กรุณาเลือกวันสิ้นสุดการลา");
        else if(this.reason2 == null) alert("กรุณากรอกเหตุผล");
        else if(this.diffDay>this.leavetatelAll.BalanceDay && this.leavetatelAll.BalanceDay != 0 ){
            this.diff = this.diffDay-this.leavetatelAll.BalanceDay;
            alert("*คุณมีวัน"+this.leaveTypeSelect2+" = "+this.leavetatelAll.BalanceDay+"วัน\n"+"หากคุณต้องการ"+this.leaveTypeSelect2+" "+this.diffDay+"วัน คุณต้องคีย์ลา "+this.leavetatelAll.BalanceDay+"วัน หนึ่งครั้งและ "+this.diff+"วัน อีกหนึ่งครั้ง!");
        }
        else{
            let CheckDoublyLeaves_Fullday = this.CheckDoublyLeaves_Fullday(this.leaveTypeSelect2,this.startDate2,this.endDate2);
            if(CheckDoublyLeaves_Fullday==0) alert("วันที่ ที่คุณเลือกมีการลาแล้ว กรุณาตรวจสอบอีกครั้ง!");
            else{
             this.http.post(API1  +/SaveLeaveFullDay/+ this.table.leaID +'/'+ this.leaveTypeSelect2 +'/'+ this.startDate2 +'/'+  this.endDate2 +'/'+ this.reason2 +'/'+ this.diffDay +'/'+ this.leavetatelAll.leavesNumbersID +'/'+ this.departmentIDLogin ,{})
                        .subscribe(
                                       dataLeave => {
                                           console.log('PUT Request is successful', dataLeave);
                                           alert(this.leaveTypeSelect2+"ลา "+this.diffDay+" วัน สำเร็จ รอการอนุมัติ");
                                            //window.location.reload(true);
                                            localStorage.setItem('links', 'attendance');
                                            this.SentEmail(this.leaveTypeSelect2,this.startDate2,this.endDate2,'8:00','17:00',0,'วัน',this.reason2);
                                            this.x=false;
                                            this.ClearTextInput();
                                            this.UpdateLeaveNumber(this.diffDay);
                                       },
                                       error => {
                                          console.log('Error', error);
                                          alert("ไม่สำเร็จ กรุณาลองใหม่");
                                          window.location.reload(true);
                                       }
                                      );

              this.x=true;
             }
        }

  }

  SentEmail(leaveType:any,startdate:any,enddate:any,statTime:any,endTime:any,totalTime:any,type:any,reason:any){
        this.service.getemployee1person(this.empId).subscribe(dataEmp => {for(let i of dataEmp){this.empRole = i.roleStatus;}});
        if(totalTime==0)
           this.dateAndTotel = "ในวันที่ "+this.datepipe.transform(startdate, 'dd/MM/yyyy')+" "+statTime+" น. ถึงวันที่ "+this.datepipe.transform(enddate, 'dd/MM/yyyy')+" "+endTime+" น. รวมเป็นเวลา "+this.diffDay+" "+type;
        else
          this.dateAndTotel = "ในวันที่ "+this.datepipe.transform(startdate, 'dd/MM/yyyy')+" "+statTime+" น. ถึงวันที่ "+this.datepipe.transform(enddate, 'dd/MM/yyyy')+" "+endTime+" น. รวมเป็นเวลา "+this.totalTime+" "+type;
        this.service.getDepartmentMasterRoleFindByDepartmentID(this.departmentIDLogin).subscribe(data => {
          //console.log(data);
          console.log('empRole-->',this.empRole);
          if(this.empRole=='EMPLOYEE'){ //คนส่ง
            for(let i of data){
              this.dataToInput = {
                managerID:i.employeeMasterid.employeeMasterID,
                leaveType:leaveType,
                empID:this.empId,
                dateAndTotel:this.dateAndTotel,
                reason:reason,
              };
              if(i.employeeMasterid.roleStatus=='SUPERVISOR'){ // ส่งไปหา
                //console.log(this.dataToInput);
                this.http.post(API1 + '/sendEmailToSupervisor', JSON.stringify(this.dataToInput), {headers: {"Content-Type": "application/json"}
                     }).subscribe(data2 => {
                                    console.log('Send Email To '+i.employeeMasterid.employeeMasterNickName+' '+i.employeeMasterid.roleStatus+' '+i.departmentid.departmentName);
                                 },error => {
                                     console.log('Error', error);
                                 }
                );
              }
            }
          }
          else if(this.empRole=='SUPERVISOR'){ //คนส่ง
            for(let i of data){
              this.dataToInput = {
                managerID:i.employeeMasterid.employeeMasterID,
                leaveType:leaveType,
                empID:this.empId,
                dateAndTotel:this.dateAndTotel,
                reason:reason,
              };
              if(i.employeeMasterid.roleStatus=='MANAGER'){ // ส่งไปหา
                //console.log(this.dataToInput);
                this.http.post(API1 + '/sendEmailToSupervisor', JSON.stringify(this.dataToInput), {headers: {"Content-Type": "application/json"}
                     }).subscribe(data2 => {
                                    console.log('Send Email To '+i.employeeMasterid.employeeMasterNickName+' '+i.employeeMasterid.roleStatus+' '+i.departmentid.departmentName);
                                 },error => {
                                     console.log('Error', error);
                                 }
                );
              }

            }
          }
          else if(this.empRole=='MANAGER'){ //คนส่ง
            for(let i of data){
              this.dataToInput = {
                managerID:i.employeeMasterid.employeeMasterID,
                leaveType:leaveType,
                empID:this.empId,
                dateAndTotel:this.dateAndTotel,
                reason:reason,
              };
              if(i.employeeMasterid.roleStatus=='DC MANAGER'){ // ส่งไปหา
                //console.log(this.dataToInput);
                this.http.post(API1 + '/sendEmailToDCManager', JSON.stringify(this.dataToInput), {headers: {"Content-Type": "application/json"}
                     }).subscribe(data2 => {
                                    console.log('Send Email To '+i.employeeMasterid.employeeMasterNickName+' '+i.employeeMasterid.roleStatus);
                                 },error => {
                                     console.log('Error', error);
                                 }
                );
              }

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
                    //console.log('SaveLeaveNumber -> ',this.leaveNumber);
                    for(let i of data){
                        if(i.leaveTypeid.leaveTypeForAlldayID==3){
                            this.leavetatelAll.checkDisabled = i.balanceDay;
                        }
                    }
                }

          });

    }
    UpdateLeaveNumber(time:any){
        this.http.post(API1 + '/UpdateLeaveNumber/' + this.leavetatelAll.leavesNumbersID +'/'+ time +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin +'/'+ this.statusLabelLeaveHalfDay2 +'/'+  this.leavetatelAll.leaveTypeID ,{}).subscribe(
          dataupdate => {
            console.log('Update Leave Number is successful');
          },
            error => {console.log('Error', error);}
        );
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
        let index = 0 ;
        this.diffTime1 = (date2 - date1);
        let diffDay2 = Math.ceil((this.diffTime1 / (1000 * 60 * 60 * 24))+1);
      //  console.log('date1-->\n',date1);
      //  console.log('date2-->\n',date2);
      // console.log('Leave Day =>',diffDay2);

        let testdate = new Date(parseInt(date1.getMonth()+1)+'/'+date1.toString().slice(8,10)+'/'+date1.toString().slice(11,15));
        for(let i = 0 ; i < diffDay2 ; i++){
            if(i == 0)
               testdate.setDate(testdate.getDate()+0)
            else
               testdate.setDate(testdate.getDate()+1)

          if(testdate.toString().slice(0,3) == 'Sun'){
              index = index + 0;
          }else{
             index = index + 1;
          }
        }
        this.diffDay = index;
        console.log('Leave Day =>',this.diffDay);
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
              this.leavetatelAll.leaveTypeID = i.leaveTypeid.leaveTypeForAlldayID;
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

    CheckStatusVacationLeave(){
       console.log('ddddd');
        if(this.leaveTypeSelect2=='ลาพักร้อน'){
            this.statusVacationLeave = true;
            console.log('ddddd');
        }
    }

}

//Dialog AttendanceCancelDialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
  leavesNumbersid;
  employeeMasterid;
  diffDay;
}
@Component({
    selector: 'attendanceDelete',
    templateUrl: 'attendanceDelete.html',
  })
  export class AttendanceCancelDialog {
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;
    leavesNumbersID;
    diffDay;
    roleStatus;
    constructor(public dialogRef: MatDialogRef<AttendanceCancelDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public data: DialogData,private http: HttpClient){
          dialogRef.disableClose = true;
        this.leavesID = this.data.leavesID;
        this.leavesNumbersID = data.leavesNumbersid.leavesNumbersID;
        this.diffDay = data.diffDay;
        this.roleStatus = data.employeeMasterid.roleStatus;
        console.log(data.diffDay);
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    DeleteAttendance(){
        this.dialogRef.close();
               this.http.post(API1 + '/CancelLeave/' + this.leavesID ,{})
                                     .subscribe(
                                         data => {
                                             console.log('PUT Request is successful');
                                             //window.location.reload(true);
                                              this.dialogRef.close();
                                              localStorage.setItem('links', 'attendance');
                                              this.CalculateLeaveNumberBack();
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );

    }

    CalculateLeaveNumberBack(){
        this.http.post(API1 + '/CalculateLeaveNumberBack/' + this.leavesNumbersID +'/'+ this.diffDay +'/'+ this.leavesID,{})
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

