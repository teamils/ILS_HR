import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { API1 } from '../app.component';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceShowLeavenumberComponent } from '../attendance-show-leavenumber/attendance-show-leavenumber.component';
import { ExcelService } from '../excel.service';
import { AppDateAdapter, APP_DATE_FORMATS} from './date.adapter';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface Emp{
  empCodeIDxx : number;
  employeeMasterCustomerCode : String;
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe,
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})

export class ReportComponent implements OnInit {

  progressBar=false;
  showTable: Array<any>;
  leaveType: Array<any>;
  department: Array<any>;

  startDateSearch;
  endDateSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
  departmentSelect;
  leavePayment;
  searchStatus=false;
  dataSearch;
  roleStatusInLogin = sessionStorage.getItem('roleStatusInLogin');
  displayedColumns: string[] = ['number','employeeCode', 'name','position','department'/*,'employeeType'*/,'date', 'leaveType','startDate', 'endDate','total','reason', 'approvedBySupervisor', 'approvedByManager','reasonNotApprove','isPayment','leaveStatus'];
  dataSource = new MatTableDataSource<Emp>(this.showTable);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;

  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public datepipe: DatePipe,
             private excelService:ExcelService) { }

  ngOnInit() {
      this.searchStatus=false;
      this.service.getleaveTypeForAlldays().subscribe(data => {
        this.leaveType = data;
        //console.table(this.leaveType);
      });
      this.service.getDepartment().subscribe(data => {
        this.department = data;
        //console.log('department == ',this.department);
      });

  }
  onlyOdds = (d: Date): boolean => {
    const day = d.getDay();
    return day !== 0 ;
  }
clickSearch(){
    this.progressBar = true;
    let statususer =   sessionStorage.getItem('roleStatusInLogin');

    if(statususer == 'MANAGER'){

      if(this.startDateSearch == undefined || this.endDateSearch == undefined){
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
              this.service.getLeavesManager(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                       console.table(this.showTable);
                       this.dataSource.data = this.showTable;
                       this.dataSource.paginator = this.paginator;
                        for(let i of this.showTable){
                          i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                          i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                          i.createDate =  this.SplitCreateDate(i.createDate);
                        }
                      this.progressBar = false;
               });
      }
      else{
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
              this.service.getLeavesManagerHavedate(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                       console.table(this.showTable);
                       this.dataSource.data = this.showTable;
                       this.dataSource.paginator = this.paginator;
                        for(let i of this.showTable){
                          i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                          i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                          i.createDate =  this.SplitCreateDate(i.createDate);
                        }
                      this.progressBar = false;
               });
      }


    }else if(statususer == 'SUPERVISOR'){

      if(this.startDateSearch == undefined || this.endDateSearch == undefined){
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
              this.service.getLeavesSupervisor(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });
      }
      else{
            if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

          this.service.getLeavesSupervisorHaveDate(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });
      }



    }else if(statususer == 'EMPLOYEE'){

          if(this.startDateSearch == undefined || this.endDateSearch == undefined){ //ถ้าไม่ใส่วันที่
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
             this.service.getLeavesEmployeeNoDate(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
             this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                 this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                 console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }else{ //ถ้าใส่วันที่
                if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
                this.service.getLeavesEmployeeHaveDate(sessionStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });


          }


    }else if(statususer == 'DC-MANAGER'){


          if(this.startDateSearch == undefined || this.endDateSearch == undefined){ //ถ้าไม่ใส่วันที่
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }
              this.service.getLeavesDCManager( this.leaveTypeSearch , this.leaveStatusSearch ,
                   this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                    this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                   console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }else{ //ถ้าใส่วันที่
                if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

                this.service.getLeavesDCManagerHavedate(this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }
    }else if(statususer == 'HR-ADMIN'){

          if(this.startDateSearch == undefined || this.endDateSearch == undefined){ //ถ้าไม่ใส่วันที่
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

              this.service.getLeavesHRADMIN( this.leaveTypeSearch , this.leaveStatusSearch ,
                   this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                    this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                   console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }else{ //ถ้าใส่วันที่
                if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

              this.service.getLeavesHRADMINHavedate(this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }
    }else if(statususer == 'ADMIN'){

          if(this.startDateSearch == undefined || this.endDateSearch == undefined){ //ถ้าไม่ใส่วันที่
              if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

              this.service.getLeavesADMIN( this.leaveTypeSearch , this.leaveStatusSearch ,
                   this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                    this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                   console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }else{ //ถ้าใส่วันที่
                if(this.dataSearch == ''){
                  this.dataSearch=undefined;
              }

              this.service.getLeavesADMINHavedate(this.leaveTypeSearch , this.leaveStatusSearch ,
                 this.departmentSelect , this.leavePayment,this.dataSearch,this.datepipe.transform(this.startDateSearch, 'yyyy-MM-dd'),this.datepipe.transform(this.endDateSearch, 'yyyy-MM-dd')).subscribe(data => {
                     this.showTable = data;
                     if(this.showTable.length == 0) this.searchStatus=true;
                     else this.searchStatus=false;
                     console.table(this.showTable);
                     this.dataSource.data = this.showTable;
                     this.dataSource.paginator = this.paginator;
                      for(let i of this.showTable){
                        i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                        i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        i.createDate =  this.SplitCreateDate(i.createDate);
                      }
                      this.progressBar = false;
               });

          }
    }

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

exportexcel(){
    if(this.showTable.length != 0){
      let dataleave : any[] = [];
          for(let i = 0 ; i < this.showTable.length ; i++){
              dataleave.push({
                สำดับ : i+1,
                ชื่อ_สกุล : this.showTable[i].employeeMasterid.employeeMasterFirstName+"  "+this.showTable[i].employeeMasterid.employeeMasterLastName,
                ตำแหน่ง : this.showTable[i].employeeMasterid.employeePosition,
                แผนก : this.showTable[i].employeeMasterid.departmentid.departmentName,
                วันที่เขียนใบลา : this.showTable[i].createDate,
                วันที่เริ่มลา : this.showTable[i].startDateForAllDay+" "+this.showTable[i].startTime,
                ลาถึงวันที่ : this.showTable[i].endDateForAllDay+" "+this.showTable[i].endTime,
                ประเภทการลา : this.showTable[i].leaveTypeForAllDay.leaveTypeForAlldayName,
                ระยะเวลาที่ลา : this.showTable[i].labelLeaveHalfDay,
                เหตุผล : this.showTable[i].reasonForAllDay,
                หัวหน้างานอนุมัติ : this.showTable[i].approvedBySupervisor,
                ผู้จัดการอนุมัติ : this.showTable[i].approvedByManager,
                HR_ยืนยัน : this.showTable[i].confirmByHR,
                จ่ายเงิน : this.showTable[i].isPayment,
                สถานะการลา : this.showTable[i].leaveStatus,
              });
          }
          this.excelService.exportAsExcelFile(dataleave, 'Dataleave');
    }
}



}
