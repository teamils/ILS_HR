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

export interface Apps{
  empCodeIDxx : number;
  employeeMasterCustomerCode : String;
}

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})

export class EmployeeMasterComponent implements OnInit {
data:any={}
employee : Array<any>;
employeeSelect : '';
accountuser : Array<any>;

displayedColumns: string[] = ['select','empCodeID','empFristName','NickName','Gender','Status','BirthDate','PersonID','Tel1','Email','AddressReal','AddressPerson','StartDate','Position','Department','empType','educations','bank','bankNumber','del','Edit'];
dataSource = new MatTableDataSource<Apps>(this.employee);
selection = new SelectionModel<Apps>(true, []);
@ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
@ViewChild(MatSort, {static : true}) sort: MatSort;

isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

public API = '//localhost:8080/ILS_HR';   //for test
/** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Apps): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.empCodeIDxx + 1}`;
  }

constructor(private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
            private service:ServiceService,
           ) { }

    ngOnInit() {
        this.service.getemployee().subscribe(data => {
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


}
