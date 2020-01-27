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
  selector: 'app-approve-by-manager',
  templateUrl: './approve-by-manager.component.html',
  styleUrls: ['./approve-by-manager.component.css']
})
export class ApproveByManagerComponent implements OnInit {
  leaves  : Array<any>;
  LeavesToComplete: Array<any>;
  departmentMasterRole: Array<any>;
  isChecked;
  intervalMan:any;
  interval2Man:any;
  interval3Man:any;
  leaveID;
  dis;
  progressBar=false;
  dataSearch='';
  empId = localStorage.getItem('empId');
  firstNameOnLogin = localStorage.getItem('fName');
  lastNameOnLogin  = localStorage.getItem('lName');
  departmentOnLogin = localStorage.getItem('departmentlogin');

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
  approve(row : any){
        this.progressBar = true;
        this.http.post(API1 + '/approveByManager/' + row.leavesID +'/'+ this.firstNameOnLogin +'/'+ this.lastNameOnLogin  ,{}).subscribe(data => {
            console.log('Approve is successful');
            alert("Approve successful");
            this.progressBar = false;
          },
          error => {
            console.log('Error', error);
          }
        );
  }
  notApprove(row : any){
      const dialogRef = this.dialog.open(ReasonNotApproveBygerDialog, {
                  width: '360px',
                  height:'270px',
                  data: row,
            });
  }
  onChange(){
          this.dataSearch='';
          this.progressBar = true;
              if(this.isChecked == true){
                this.dis=true;
                 clearInterval(this.interval2Man);
                  clearInterval(this.interval3Man);
                  this.intervalMan = setInterval(() => {
                  this.service.getLeavesSelectDepartment(this.empId).subscribe(dataLeavesToComplete => {
                        this.leaves = dataLeavesToComplete;
                        this.dataSource.data = this.leaves;
                        this.progressBar = false;
                        for(let i of this.leaves){
                          i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                          i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                        }
                        //console.log('leaves -> ',this.leaves);
                    });
                }, 1000);
              }
              else{
                this.dis=false;
                clearInterval(this.intervalMan);
                clearInterval(this.interval3Man);
                this.interval2Man = setInterval(() => {
                  this.service.getShowLeavesNotApproveBySup(this.empId).subscribe(data => {
                    this.leaves = data;
                    this.dataSource.data = this.leaves;
                    this.progressBar = false;
                    for(let i of this.leaves){
                      i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                      i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
                    }
                    //console.log('leaves -> ',this.leaves);
                  });
                }, 1000);
              }

  }
  SearchInputNull(){
    this.ngOnDestroy();
    //console.log(this.dataSearch);
    if(this.dataSearch==''){
      this.onChange();
      this.progressBar = false;
    }
  }
  SearchEmployeeByCodeAndNameInApproveByManagerNOTApprove(){
    this.ngOnDestroy();
      this.service.getSearchEmployeeByCodeAndNameInApproveByManager(this.dataSearch,this.empId).subscribe(data => {
              this.leaves = data;
              this.dataSource.data = this.leaves;
              for(let i of this.leaves){
                i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
              }
      });
  }
  SearchEmployeeByCodeAndNameInApproveByManagerApprove(){
    this.ngOnDestroy();
      this.service.getSearchEmployeeByCodeAndNameInApprove(this.dataSearch,this.empId).subscribe(data => {
              this.leaves = data;
              this.dataSource.data = this.leaves;
              for(let i of this.leaves){
                i.startDateForAllDay = this.SplitDate(i.startDateForAllDay);
                i.endDateForAllDay = this.SplitDate(i.endDateForAllDay);
              }
      });
  }

}


//Dialog
export interface DialogData {
  leavesID : null;
  isActiveAttendance: string;
}
@Component({
    selector: 'reasonNotApprovebyger',
    templateUrl: 'reasonNotApprovebyger.html',
  })

export class ReasonNotApproveBygerDialog {
    leavesID: string;
    isActiveAttendance:string;
    reasonNotapprove=null;
    constructor(public dialogRef: MatDialogRef<ReasonNotApproveBygerDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public date: DialogData,private http: HttpClient){
         this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

   notApprove(){
        this.http.post(API1 + '/notApproveByManager/' + this.leavesID +'/'+ this.reasonNotapprove,{}).subscribe(data => {
            console.log('Not approve is successful');
            alert("Not approve successful");
          },
          error => {
            console.log('Error', error);
          }
        );
        //this.ss.onChange();
        this.dialogRef.close();
    }



}
