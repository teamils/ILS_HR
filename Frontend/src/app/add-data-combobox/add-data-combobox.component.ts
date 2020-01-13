import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppComponent } from '../app.component';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceShowLeavenumberComponent } from '../attendance-show-leavenumber/attendance-show-leavenumber.component';

@Component({
  selector: 'app-add-data-combobox',
  templateUrl: './add-data-combobox.component.html',
  styleUrls: ['./add-data-combobox.component.css']
})
export class AddDataComboboxComponent implements OnInit {

  NewBank:Array<any>;
  bankName:String='';
  department:Array<any>;
  departmentInput:String='';
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient,
             public api : AppComponent) { }
    public APIs = this.api.API;

  ngOnInit() {
      this.service.getBank().subscribe(data => {
          this.NewBank = data;
          //console.log('NewBank == ',this.NewBank);
      });
      this.service.getDepartment().subscribe(data => {
          this.department = data;
          //console.log('department == ',this.department);
      });
  }
  /*--------------------------------BANK-------------------------------------------*/
  InsertBank(){
    this.http.post(this.APIs + '/insertBank/' + this.bankName ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.bankName='';
        }
    );
  }
  DeleteBank(row : any){
    this.http.delete(this.APIs + '/deleteBank/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.bankName='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------DEPARTMENT-------------------------------------------*/
  InsertDepartment(){
    this.http.post(this.APIs + '/insertDepartment/' + this.departmentInput ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.departmentInput='';
        }
    );
  }
  DeleteDepartment(row : any){
    this.http.delete(this.APIs + '/deleteDepartment/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.departmentInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  RefreshTable(){
    setTimeout(() => {
      this.service.getBank().subscribe(data => {
          this.NewBank = data;
          //console.log('NewBank == ',this.NewBank);
      });
      this.service.getDepartment().subscribe(data => {
          this.department = data;
          //console.log('department == ',this.department);
      });
    }, 200);
  }

}
