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
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

export interface Emp{
  empCodeIDxx : number;
  employeeMasterCustomerCode : String;
}

@Component({
  selector: 'app-report-employee-master',
  templateUrl: './report-employee-master.component.html',
  styleUrls: ['./report-employee-master.component.css']

})
export class ReportEmployeeMasterComponent  {

  progressBar=false;
  hide=false;
  dataSearch=null;
  employee:Array<any>;
  gender:Array<any>;
  genderSelect;
  department:Array<any>;
  departmentSelect;
  position:Array<any>;
  positionSelect;
  employeeType:Array<any>;
  employeeTypeSelect;
  searchStatus=false;

  displayedColumns: string[] = ['number','empCodeID','empFristName','empLastName','Gender','Tel1','StartDate','Position','Department','empType'];
  dataSource = new MatTableDataSource<Emp>(this.employee);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  @ViewChild(MatSort, {static : true}) sort: MatSort;
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             private excelService:ExcelService) { }

  ngOnInit() {
        this.service.getGender2().subscribe(data => {
               this.gender = data;
               //console.log('gender == ',this.gender);
        });
        this.service.getDepartment().subscribe(data => {
               this.department = data;
               //console.log('department == ',this.department);
        });
        this.service.getPosition().subscribe(data => {
               this.position = data;
               //console.log('position == ',this.position);
        });
        this.service.getEmployeeType().subscribe(data => {
               this.employeeType = data;
               //console.log('employeeType == ',this.employeeType);
        });
      this.searchStatus=false;
  }
  SetEmployee(data:any){
       if(data.length == 0) this.searchStatus=true;
       else this.searchStatus=false;

       this.progressBar = false;
       this.employee = data;
       this.dataSource.data = this.employee;
       this.dataSource.paginator = this.paginator;
  }
  clickSearch(){
      if(this.dataSearch == '') this.dataSearch = null;
      this.http.get(API1+'/SearchEmployeeInReport/' +  this.dataSearch  +'/'+ this.genderSelect +'/'+ this.departmentSelect +'/'+ this.positionSelect +'/'+ this.employeeTypeSelect,{})
                               .subscribe(data => {
                                  this.SetEmployee(data);
                               },error => {
                                  console.log('Error', error);
                               });
  }

  exportexcel(): void{
        if(this.employee.length != 0){
          let dataemployee : any[] = [];
          for(let i = 0 ; i < this.employee.length ; i++){
              dataemployee.push({
                สำดับ : i+1,
                รหัสพนักงาน : this.employee[i].employeeMasterCustomerCode,
                คำนำหน้า : this.employee[i].prefix,
                ชื่อ : this.employee[i].employeeMasterFirstName,
                นามสกุล : this.employee[i].employeeMasterLastName,
                ชื่อเล่น : this.employee[i].employeeMasterNickName,
                เพศ : this.employee[i].employeeMasterGender,
                รหัสประจำตัวประชาชน : this.employee[i].employeeMasterPersonID,
                วันเกิด : this.employee[i].employeeMasterBirthDate,
                เลขบัญชี : this.employee[i].bankNumber,
                ธนาคาร : this.employee[i].bank,
                ตำเเหน่ง : this.employee[i].employeePosition,
                เเผนก : this.employee[i].departmentid.departmentName,
                สถานะทำงาน : this.employee[i].maritalStatus,
                วันเริ่มงาน : this.employee[i].employeeMasterStartDate,
                เบอร์โทร : this.employee[i].employeeMasterTel1,
                อีเมล : this.employee[i].empEmail,
                ที่อยู่ตามบัตรประชาชน : this.employee[i].empAddressReal,
                ที่อยู่ปัจจุบัน : this.employee[i].empAddressPerson,
                ผู้ที่ติดต่อในกรณีฉุกเฉิน : this.employee[i].emergencyContact,
                ประเภทการทำงาน : this.employee[i].employeeType,
                วุฒิการศึกษา : this.employee[i].education,
              });
          }
          this.excelService.exportAsExcelFile(dataemployee, 'Data-Employee');
        }
  }


}
