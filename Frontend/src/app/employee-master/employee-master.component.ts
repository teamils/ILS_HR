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
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AppComponent } from '../app.component';


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
    data:any={}
    employee : Array<any>;
    employeeSelect : '';
    dataSearch: null;
    accountuser : Array<any>;
    pipe = new DatePipe('en-TH');
    displayedColumns: string[] = [/*'select',*/'number','empCodeID'/*,'prefix'*/,'empFristName','empLastName',/*'NickName',*/'Gender'/*,'Status','BirthDate'*/ /*,'Age'*/ ,'PersonID','Tel1'/*,'Email','AddressReal','AddressPerson'*/,'StartDate','Position','Department','empType'/*,'educations'*//*,'bank','bankNumber'*/,'del','Edit'];
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
                private service:ServiceService) { }



        ngOnInit() {
            this.service.getemployee().subscribe(data => {
                   this.employee = data;
                    this.dataSource.data = this.employee;
                    //console.log('employee->',this.employee);
                    //console.log(this.employee.length);
                    //this.datemmddyy(data);
              });
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;

        }
        startwork: Array<any>;
        datemmddyy(data : any){
            for (let i of data) {
                //console.log(i.employeeMasterStartDate);
                this.startwork = i.employeeMasterStartDate
                  //console.log('startwork',this.startwork);
            }

        }
          DeleteEmployeeMaster(row : any){
            const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
                  width: '300px',
                  height:'200px',
                  data: row,
            });
          }
          OpenEditDialogComponent(row : any){
               const dialogRef = this.dialog.open(EmployeeEditComponent, {
                   width: '90%',
                   height:'90%',
                   data: row,
              });
          }





}


