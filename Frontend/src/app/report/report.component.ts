import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { API1 } from '../app.component';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceShowLeavenumberComponent } from '../attendance-show-leavenumber/attendance-show-leavenumber.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [DatePipe]
})
export class ReportComponent implements OnInit {

  progressBar=false;
  leaveType: Array<any>;
  department: Array<any>;

  startDateSearch;
  endDateSearch;
  hide=false;
  leaveTypeSearch;
  leaveStatusSearch;
  departmentSelect;
  leavePayment;
  showTable: Array<any>;
  dataSearch;
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public datepipe: DatePipe) { }

  ngOnInit() {
      this.service.getleaveTypeForAlldays().subscribe(data => {
        this.leaveType = data;
        //console.table(this.leaveType);
      });
      this.service.getDepartment().subscribe(data => {
        this.department = data;
        //console.log('department == ',this.department);
      });

  }

clickSearch(){
    let statususer =   localStorage.getItem('roleStatusInLogin');
    if(statususer == 'MANAGER'){
      console.log(1);
    }else if(statususer == 'SUPERVISOR'){
      console.log(2);
    }else if(statususer == 'EMPLOYEE'){
          console.log(this.startDateSearch, this.endDateSearch);
          if(this.startDateSearch == undefined || this.endDateSearch == undefined){

             this.service.getLeavesEmployee(localStorage.getItem('empId') , this.leaveTypeSearch , this.leaveStatusSearch ,
             this.departmentSelect , this.leavePayment,this.dataSearch).subscribe(data => {
                 this.showTable = data;
                 console.table(this.showTable);
               });

          }else{

          }


    }else if(statususer == 'DC-MANAGER'){

    }
}

}
