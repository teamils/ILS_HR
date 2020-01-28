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
import { ReasonNotApproveDialog } from '../approve-by-supervisor/approve-by-supervisor.component';
import { API1 } from '../app.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
@Component({
  selector: 'app-dc-manager',
  templateUrl: './dc-manager.component.html',
  styleUrls: ['./dc-manager.component.css']
})
export class DcManagerComponent implements OnInit {

  empId = localStorage.getItem('empId');
  firstNameOnLogin = localStorage.getItem('fName');
  lastNameOnLogin  = localStorage.getItem('lName');
  departmentOnLogin = localStorage.getItem('departmentlogin');

  leaves  : Array<any>;
  progressBar=false;
  intervalMan:any;
  interval2Man:any;
  interval3Man:any;

  displayedColumns: string[] = ['number','employeeCode', 'name','date', 'leaveType', 'startDate', 'endDate','total', 'reason', /*'approvedBySupervisor', 'approvedByManager',*/'leaveStatus','approve','notApprove'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  constructor(private service:ServiceService,
              private router:Router,
              private route:ActivatedRoute ,
              public dialog: MatDialog,
               private http: HttpClient) { }

  ngOnDestroy() {
      clearInterval(this.intervalMan);
      clearInterval(this.interval2Man);
      clearInterval(this.interval3Man);
  }

  ngOnInit() {
        this.progressBar = true;
        this.interval3Man = setInterval(() => {
          this.service.getShowLeavesNotApproveBySup(this.empId).subscribe(data => {
              //console.log('leaves -> ', data.leaveStatus);
              this.leaves = data;
              this.dataSource.data = this.leaves;
              this.progressBar = false;
              for(let i of this.leaves){
                i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
              }
              //console.log('leaves -> ',this.leaves);
          });
          this.dataSource.paginator = this.paginator;
        }, 1000);
  }

  SplitDate(date:any){
    var DateSplitted = date.split("-");
    return DateSplitted[2] +"-"+ DateSplitted[1] +"-"+ DateSplitted[0];
  }

}
