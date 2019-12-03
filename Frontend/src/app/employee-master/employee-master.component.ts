import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../service/service.service';

import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material';
import {  SelectionModel } from '@angular/cdk/collections';
import {  DatePipe} from '@angular/common';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { NewheaderComponent } from '../newheader/newheader.component';

export interface Emp{
  empCodeIDxx : number;
  employeeMasterCustomerCode : String;
}

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})

export class EmployeeMasterComponent implements OnInit {
    onHide : boolean;
    public API = '//localhost:8080/ILS_HR';   //for test
    data:any={}
    employee : Array<any>;
    employeeSelect : '';
    accountuser : Array<any>;
    pipe = new DatePipe('en-TH');
    CurrentDateTime = new Date();


    displayedColumns: string[] = ['select','id','empCodeID','prefix','empFristName','empLastName','NickName','Gender','Status','BirthDate','PersonID','Tel1','Email','AddressReal','AddressPerson','StartDate','Position','Department','empType','educations','bank','bankNumber','del','Edit'];
    dataSource = new MatTableDataSource<Emp>(this.employee);
    selection = new SelectionModel<Emp>(true, []);
    @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
    @ViewChild(MatSort, {static : true}) sort: MatSort;

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }


    /** Selects all rows if they are not all selected; otherwise clear selection. */
      masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
      }

      /** The label for the checkbox on the passed row */
      checkboxLabel(row?: Emp): string {
        if (!row) {
          return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empCodeIDxx + 1}`;
      }

     applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

      constructor(private router:Router,
                private route:ActivatedRoute ,
                public dialog: MatDialog,
                 private http: HttpClient,
                private service:ServiceService,
               ) { }

        ngOnInit() {
            this.service.getemployee().subscribe(data => {
                    console.log(this.CurrentDateTime);
                   this.employee = data;
                    this.dataSource.data = data;
                   console.log(this.employee);

              });

            this.service.getaccountUsers().subscribe(data => {
                   this.accountuser = data;
                   console.log(this.accountuser);
              });

             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
        }

          OpenEditDialogComponent(row : any){
               const dialogRef = this.dialog.open(EmployeeEditComponent, {
                   width: '90%'
                   , height:'90%'
                    , data: row,
              });
          }



}


