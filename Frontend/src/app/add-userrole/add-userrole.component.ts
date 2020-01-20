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
  selector: 'app-add-userrole',
  templateUrl: './add-userrole.component.html',
  styleUrls: ['./add-userrole.component.css']
})
export class AddUserroleComponent implements OnInit {

  masterRole:Array<any>;
  userRole:Array<any>;
  employee:Array<any>;
  dataSearch='';
  toppings:Array<any>;
  employeeMasterID;
  employeeMasterFirstName;
  employeeMasterLastName;
  roleStatus;
  masterRoleID;
  progressBar=false;
  toppingList: string[] = [];
  constructor(private service:ServiceService,
              private router:Router,
              private route:ActivatedRoute ,
              public dialog: MatDialog,
               private http: HttpClient) {}

  ngOnInit(){
      this.service.getMasterRole().subscribe(data => {
          this.masterRole = data;
          //console.log('masterRole == ',this.masterRole);
      });
  }

  displayedColumns: string[] = ['no', 'name','role','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.userRole);

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
              this.roleStatus = data.roleStatus;
              //console.log(this.employee);
              this.service.getUserRolesByEmpCode(this.dataSearch).subscribe(data => {
                  this.userRole = data;
                  this.dataSource.data = this.userRole;
                  //console.log('userRole -> ',this.userRole);
              });
            }
            this.progressBar = false;
        });
      }

  }

  InsertUserRole(){
      this.progressBar = true;
      if(this.dataSearch == ''){alert("กรุณากรอกรหัสพนักงาน"); this.progressBar = false;}
      else if(this.toppings==null){alert("กรุณาเลือก User Role"); this.progressBar = false;}
      else{
        for(let i=0;i<this.toppings.length;i++){
          //console.log(this.toppings[i]);
          this.http.get(API1 + '/getUserRoleByempIDAndMasterRoleID/' + this.employeeMasterID +'/'+ this.toppings[i].id ,{})
            .subscribe(
              data => {
                 if(data!=null){
                              alert("คุณ"+this.employeeMasterFirstName+" "+this.employeeMasterLastName+" มีสิทธิ์เข้าถึง "+this.toppings[i].masterRoleName+" อยู่แล้ว");
                              this.progressBar = false;
                 }
                 else{
                      this.http.post(API1 + '/insertUserRole/' + this.employeeMasterID +'/'+ this.toppings[i].id ,{})
                        .subscribe(
                            data => {
                              this.RefreshTable();
                              this.progressBar = false;
                              this.toppings = null;
                            }
                      );
                 }
              }
          );

        }
      }
  }

  DeleteUserRole(row : any){
      this.progressBar = true;
      this.http.delete(API1 + '/deleteUserRoles/' + row ,{})
        .subscribe(
          data => {
            this.RefreshTable();
            this.progressBar = false;
          }
      );
  }

  RefreshTable(){
    this.service.getUserRolesByEmpCode(this.dataSearch).subscribe(data => {
        this.userRole = data;
        this.dataSource.data = this.userRole;
        //console.log('userRole -> ',this.userRole);
    });
  }

}
