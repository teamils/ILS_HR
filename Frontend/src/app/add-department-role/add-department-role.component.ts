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
  empCode:String;

  employeeMasterFirstName;
  employeeMasterLastName;
  employeePosition;
  departmentName;
  employeeMasterID;
  searchDepartmentRole;
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
        this.service.getDepartmentMasterRole().subscribe(data => {
               this.departmentRole = data;
               this.dataSource.data = this.departmentRole;
                this.dataSource.paginator = this.paginator;
               //console.log('departmentRole == ',this.departmentRole);
        });
  }

  displayedColumns: string[] = ['empCode','name','po','de','depart','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.departmentRole);
  @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;

  SearchEmpCode(){
        this.service.getSearchEmpCode(this.empCode).subscribe(
        data => {
          if(data==null){
            alert("ไม่มีรหัสพนักงาน "+this.empCode+" ในระบบ!");
          }
          else{
            this.employee = data;
            this.employeeMasterFirstName = data.employeeMasterFirstName;
            this.employeeMasterLastName = data.employeeMasterLastName;
            this.employeePosition = data.employeePosition;
            this.departmentName = data.departmentid.departmentName;
            this.employeeMasterID = data.employeeMasterID;
            //console.log('this.employee -> ',this.employee);
            this.getDepartmentMasterRole();
          }
        });
  }

deName='';
deNamesubstr;
  getDepartmentMasterRole(){
      this.service.getDepartmentMasterRole2(this.employeeMasterID).subscribe(data => {
               this.departmentRoleFindByempID = data;
               //console.log('departmentRoleFindByempID == ',this.departmentRoleFindByempID);
                for(let i of data){
                  this.deName = this.deName+','+i.departmentid.departmentName;
                }
                this.deNamesubstr = this.deName.substr(1, 10000);
                //console.log(this.deNamesubstr);
        });
  }

  InsertDataDepartmentRole(){
    for (let i = 0; i < this.departmentSelect.length; i++) {
        this.http.get(API1 + '/DepartmentMasterRoleFindByEmpIDAndDepartmentID/' + this.employeeMasterID +'/'+ this.departmentSelect[i] ,{})
                .subscribe(
                    data => {
                        if(data!=null){
                            alert("คุณ"+this.employeeMasterFirstName+" "+this.employeeMasterLastName+" มีเเผนก"+this.departmentSelect[i]+"อยู่ภายใต้การดูแลอยู่แล้ว");
                        }
                        else{
                            this.http.post(API1 + '/insertDataDepartmentRole/' + this.employeeMasterID +'/'+ this.departmentSelect[i] ,{})
                              .subscribe(
                                  data => {
                                      console.log(data);
                                      alert("Add Role "+this.departmentSelect[i]+" successful");
                                      this.clearInput();
                                      this.RefreshTable();
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

  Delete(row : any){
    //console.log(row.departmentMasterRoleID);
    this.http.delete(API1 + '/deleteRole/' + row.departmentMasterRoleID ,{})
                              .subscribe(
                                  data => {
                                      alert("Delete is successful");
                                      this.RefreshTable();
                                  }
                            );
  }

  SearchDepartmentRole(){
      this.service.getDepartmentMasterRoleFindByEmpCode(this.searchDepartmentRole).subscribe(data => {
               this.departmentRole = data;
               this.dataSource.data = this.departmentRole;
                this.dataSource.paginator = this.paginator;
               //console.log('departmentRole == ',this.departmentRole);
        });
  }
  RefreshTable(){
             setTimeout(() => {
                this.service.getDepartmentMasterRole().subscribe(data => {
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
    this.empCode  = '';
    this.deNamesubstr = '';
    this.deName='';
    this.departmentRoleFindByempID = [];
  }

}
