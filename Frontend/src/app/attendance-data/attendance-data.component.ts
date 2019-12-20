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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-attendance-data',
  templateUrl: './attendance-data.component.html',
  styleUrls: ['./attendance-data.component.css']
})
export class AttendanceDataComponent implements OnInit {
  leaves  : Array<any>;
  LeavesToComplete: Array<any>;
  isChecked;
  interval:any;
  dis;
  displayedColumns: string[] = ['number','employeeCode', 'name','position','department','date', 'leaveType', 'reason', 'startDate', 'endDate','total', 'approvedBySupervisor', 'approvedByManager','leaveStatus','del'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);


  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,) { }

  ngOnDestroy() {
    if (this.interval) { // show table Leave
      clearInterval(this.interval);
    }

  }
  ngOnInit() {
        this.service.getshowLeavesToNotComplete().subscribe(data => {
            this.leaves = data;
            this.dataSource.data = this.leaves;
            //console.log('leaves -> ',this.leaves);
        });
        this.dataSource.paginator = this.paginator;

  }

          DeleteAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceDeleteDialog, {
                  width: '320px',
                  height:'200px',
                  data: row,
            });
            this.onChange();
          }
        onChange(){
           this.interval = setTimeout(() => {  //show table Leave
              if(this.isChecked == true){
                this.dis=true;
                this.service.getshowLeavesToComplete().subscribe(dataLeavesToComplete => {
                      this.leaves = dataLeavesToComplete;
                      this.dataSource.data = this.leaves;
                      //console.log('leaves -> ',this.leaves);
              });

              }
              else{
                this.dis=false;
                  this.service.getshowLeavesToNotComplete().subscribe(data => {
                    this.leaves = data;
                    this.dataSource.data = this.leaves;
                    //console.log('leaves -> ',this.leaves);


                  });
              }
            }, 1000);
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
  export class AttendanceDeleteDialog {
    public API = '//localhost:8080/';
    leavesID: string;
    isActiveAttendance:string;
    selectAttendanceDate : String;

    constructor(public dialogRef: MatDialogRef<AttendanceDeleteDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public date: DialogData,private http: HttpClient){
          dialogRef.disableClose = true;
        this.leavesID = this.date.leavesID;
        this.isActiveAttendance = this.date.isActiveAttendance;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    DeleteAttendance(){
               this.http.post(this.API + '/deleteAttendance/' + this.leavesID ,{})
                                     .subscribe(
                                         data => {
                                             console.log('PUT Request is successful');
                                              this.dialogRef.close();
                                             //window.location.reload(true);
                                              localStorage.setItem('links', 'attendanceData');
                                         },
                                         error => {
                                             console.log('Error', error);
                                         }
                                      );

        }




  }
