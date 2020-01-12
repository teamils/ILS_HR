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
import { AppComponent } from '../app.component';
import {FormControl} from '@angular/forms';
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

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

  constructor(private service:ServiceService,
              private router:Router,
              private route:ActivatedRoute ,
              public dialog: MatDialog,
               private http: HttpClient,
               public api : AppComponent) { }
      public APIs = this.api.API;

  ngOnInit() {
        this.service.getDepartment().subscribe(data => {
               this.department = data;
               //console.log('department == ',this.department);
        });
  }

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
            console.log('this.employee -> ',this.employee);
            this.getDepartmentMasterRole();
          }
        });

  }
  getDepartmentMasterRole(){
      this.service.getDepartmentMasterRole2(this.employeeMasterID).subscribe(data => {
               this.departmentRoleFindByempID = data;
               console.log('departmentRoleFindByempID == ',this.departmentRoleFindByempID);
        });
  }
  InsertDataDepartmentRole(){
    for (let i = 0; i < this.departmentSelect.length; i++) {
        this.http.get(this.APIs + '/DepartmentMasterRoleFindByEmpIDAndDepartmentID/' + this.employeeMasterID +'/'+ this.departmentSelect[i] ,{})
                .subscribe(
                    data => {
                        if(data!=null){
                            alert("คุณ"+this.employeeMasterFirstName+" "+this.employeeMasterLastName+" มีเเผนก"+this.departmentSelect[i]+"อยู่ภายใต้การดูแลอยู่แล้ว");
                        }
                        else{
                            this.http.post(this.APIs + '/insertDataDepartmentRole/' + this.employeeMasterID +'/'+ this.departmentSelect[i] ,{})
                              .subscribe(
                                  data => {
                                      console.log(data);
                                      alert("Add Role "+this.departmentSelect[i]+" successful");
                                      window.location.reload(true);

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
