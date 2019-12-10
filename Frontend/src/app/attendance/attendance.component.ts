import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import {  MatPaginator, MatTableDataSource } from '@angular/material';


export interface employeeMasters{
    Fname : String;
    Lname : String;
    Dename : String;
    Poname : String;
}

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {

  public API = '//localhost:8080/';
  employeeMasterCustomerCode : String;
  empID : Array<any>;
  nowDateToString : Array<string>;
  startDateToString : Array<string>;

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


  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
         ) { }

  ngOnInit() {
      console.log(new Date());

  }

    NewSearchData(empID){
        this.service.getSearchEmployeeForAttendance(empID).subscribe(data1 => {
            if(data1 != null){
              console.log('data1->',data1);
              this.table.leaID = data1.employeeMasterID;
              this.table.empCode = data1.employeeMasterCustomerCode;
              this.table.fName = data1.employeeMasterFirstName;
              this.table.lName = data1.employeeMasterLastName;
              this.table.empDep = data1.employeeDepartment;
              this.table.empPos = data1.employeePosition;

              this.nowDateToString = new Date().toString().split(" ");
              console.log(parseInt(this.nowDateToString[3]));

              this.table.StartDate = data1.employeeMasterStartDate;
              this.startDateToString = this.table.StartDate.toString().split("-");
              console.log(parseInt(this.startDateToString[0]));
              this.table.sumDate = parseInt(this.nowDateToString[3]) - parseInt(this.startDateToString[0]);
              console.log(this.table.sumDate);
            }
            else{
                alert("ไม่มีรหัสพนักงานนี้ในระบบ");
            }
        });
    }


}
