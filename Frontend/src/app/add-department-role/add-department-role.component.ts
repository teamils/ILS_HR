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
import {FormControl} from '@angular/forms';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {SelectionModel} from '@angular/cdk/collections';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-add-department-role',
  templateUrl: './add-department-role.component.html',
  styleUrls: ['./add-department-role.component.css']
})
export class AddDepartmentRoleComponent implements OnInit {

  employee: Array<any>;
  department: Array<any>;
  departmentRole: Array<any>;
  departmentRoleFindByempID: Array<any>;
  departmentSelect:any;

  employeeMasterFirstName;
  employeeMasterLastName;
  employeePosition;
  departmentName;
  employeeMasterID;
  searchDepartmentRole;
  employeeMasterCustomerCode;
  dataSearch='';
  toppings:Array<any>;
  progressBar=false;

  constructor(private service:ServiceService,
              private router:Router,
              private route:ActivatedRoute ,
              public dialog: MatDialog,
               private http: HttpClient) { }

  ngOnInit() {
        this.service.getDepartment().subscribe(data => {
               this.department = data;
               //console.log('department == ',this.department);
        });
  }

  displayedColumns: string[] = ['empCode','name','po','de','depart','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.departmentRole);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  ShowDataRole(){
      this.progressBar = true;
      if(this.dataSearch == ''){
          this.progressBar = false;
          alert("กรุณากรอกรหัสพนักงาน!");
      }
      else{
        this.service.getSearchEmpCode(this.dataSearch).subscribe(data => {
            if(data==null){
                alert("รหัสพนักงานไม่ถูกต้อง!");
            }
            else{
              this.employee = data;
              this.employeeMasterID = data.employeeMasterID;
              this.employeeMasterFirstName = data.employeeMasterFirstName;
              this.employeeMasterLastName = data.employeeMasterLastName;
              this.employeePosition = data.employeePosition;
              this.departmentName = data.departmentid.departmentName;
              this.employeeMasterCustomerCode = data.employeeMasterCustomerCode;
              this.SearchDepartmentRole();
              //console.log(this.employee);
            }
            this.progressBar = false;
        });
      }
  }

  InsertDataDepartmentRole(){
    this.progressBar = true;
    if(this.dataSearch == ''){alert("กรุณากรอกรหัสพนักงาน!");this.progressBar = false;}
    else if(this.toppings==null){alert("กรุณาเลือก Department Role!"); this.progressBar = false;}
    else{
      for (let i = 0; i < this.toppings.length; i++) {
          //console.log(this.toppings[i].departmentID);
          this.http.get(API1 + '/DepartmentMasterRoleFindByEmpIDAndDepartmentID/' + this.employeeMasterID +'/'+ this.toppings[i].departmentID ,{})
                  .subscribe(
                      data => {
                          if(data!=null){
                              alert("คุณ"+this.employeeMasterFirstName+" "+this.employeeMasterLastName+" มีเเผนก"+this.toppings[i].departmentName+" อยู่ภายใต้การดูแลอยู่แล้ว");
                              this.progressBar = false;
                          }
                          else{
                              this.http.post(API1 + '/insertDataDepartmentRole/' + this.employeeMasterID +'/'+ this.toppings[i].departmentID ,{})
                                .subscribe(
                                    data => {
                                        console.log(data);
                                        this.progressBar = false;
                                        this.RefreshTable();
                                        this.clearInput();
                                    },
                                    error => {
                                        console.log('Error', error);
                                    }
                              );
                          }
                      }
          );
      }
    }
  }

  Delete(row : any){
    this.progressBar = true;
    //console.log(row.departmentMasterRoleID);
    this.http.delete(API1 + '/deleteRole/' + row.departmentMasterRoleID ,{})
                              .subscribe(
                                  data => {
                                      //alert("Delete is successful");
                                      this.RefreshTable();
                                      this.progressBar = false;
                                      this.clearInput();
                                  }
                            );
  }

  SearchDepartmentRole(){
      this.service.getDepartmentMasterRoleFindByEmpCode(this.dataSearch).subscribe(data => {
               this.departmentRole = data;
               this.dataSource.data = this.departmentRole;
                this.dataSource.paginator = this.paginator;
               //console.log('departmentRole == ',this.departmentRole);
        });
  }
  RefreshTable(){
             setTimeout(() => {
                this.service.getDepartmentMasterRoleFindByEmpCode(this.dataSearch).subscribe(data => {
                   this.departmentRole = data;
                   this.dataSource.data = this.departmentRole;
                    this.dataSource.paginator = this.paginator;
                   //console.log('departmentRole == ',this.departmentRole);
                });
             }, 1000);
  }

  clearInput(){
    this.employeeMasterFirstName = '';
    this.employeeMasterLastName = '';
    this.employeePosition = '';
    this.departmentName = '';
    this.employeeMasterID = '';
    this.departmentSelect = '';
    this.departmentRoleFindByempID = [];
    this.toppings = [];
  }

}
