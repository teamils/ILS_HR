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
const ELEMENT_DATA: PeriodicElement[] = [
{position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
{position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
{position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
{position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
{position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
{position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
{position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
{position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
{position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-attendance-data',
  templateUrl: './attendance-data.component.html',
  styleUrls: ['./attendance-data.component.css']
})
export class AttendanceDataComponent implements OnInit {
  leaves  : Array<any>;
  displayedColumns: string[] = ['number','employeeCode', 'name', 'leaveType', 'startDate', 'endDate', 'startTime', 'endTime', 'reason', 'approvedBySupervisor', 'approvedByManager','leaveStatus','del'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.leaves);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,) { }

  ngOnInit() {
          this.service.getLeaves().subscribe(data => {
            this.leaves = data;
            this.dataSource.data = this.leaves;
            console.log('leaves -> ',this.leaves);
          });
          this.dataSource.paginator = this.paginator;

  }

          DeleteAttendance(row : any){
            const dialogRef = this.dialog.open(AttendanceDeleteDialog, {
                  width: '300px',
                  height:'200px',
                  data: row,
            });
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
