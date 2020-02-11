import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';
import { API1 } from '../app.component';

export interface DialogData {
  employee : Array<any>;
  id : String ;
  NewPassword : String ;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    employee : Array<any>;
    userRole : Array<any>;
    masterRole: Array<any>;

    nameInLogin = sessionStorage.getItem('nameInLogin');

    RoleEmployee = [4, 5, 10, 11];
    RoleManager = [4, 5, 8, 10, 11];
    RoleSupervisor = [4, 5, 7, 10, 11];
    RoleHR_ADMIN = [1, 2, 3, 4, 6, 10, 11, 12, 15];
    RoleDcManager = [9, 10, 11];

    hide:any;
    id : String = null;
    NewPassword : String = null ;
    x:any=false;
    leaveTypeForAlldays: Array<any>;
    progressBar=false;
    table : any = {
      leaID : '',
      empCode : '',
      fName : '',
      lName : '',
      empDep : '',
      empPos : '',
      StartDate : '',
      sumDate : '',
      rolestatus : '',
    };

  constructor(private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
            private service:ServiceService,
            changeDetectorRef: ChangeDetectorRef,
           ) { }

    ngOnInit() {
          this.service.getMasterRole().subscribe(data => {
          this.masterRole = data;
          //console.log('masterRole == ',this.masterRole);
      });
    }

    login(id,NewPassword){
        if(this.id == null){
            alert("Please enter username");
            this.progressBar=false;
        }
        else if(this.NewPassword == null){
            alert("Please enter password");
            this.progressBar=false;
        }
        else{
              this.service.getUserPassword(id,NewPassword).subscribe(data => {
                if(data == null){
                    alert("Invalid username or password !!");
                    this.progressBar=false;
                }
                else if(data != null){
                    if(data.maritalStatus=="ยังปฏิบัติงานอยู่"){
                        this.employee = data;
                        //console.log(data);
                        this.table.leaID = data.employeeMasterID;
                        this.table.empCode = data.employeeMasterCustomerCode;
                        this.table.fName = data.employeeMasterFirstName;
                        this.table.lName = data.employeeMasterLastName;
                        this.table.rolestatus = data.roleStatus;
                        sessionStorage.setItem('loginstatus', 'true');
                        sessionStorage.setItem('empId', this.table.leaID);
                        sessionStorage.setItem('empCode', this.table.empCode);
                        sessionStorage.setItem('nameInLogin', this.table.fName+" "+this.table.lName);
                        sessionStorage.setItem('fName', this.table.fName);
                        sessionStorage.setItem('lName', this.table.lName);
                        sessionStorage.setItem('departmentIDLogin', data.departmentid.departmentID);
                        sessionStorage.setItem('startDateInLogin', data.employeeMasterStartDate);
                        sessionStorage.setItem('roleStatusInLogin', data.roleStatus);
                        console.log(this.table.rolestatus);
                        this.progressBar=false;

                        this.service.getUserRoles(data.employeeMasterID).subscribe(data => {
                            //this.userRole = data;
                            //console.log('userRole -> ',this.userRole);
                            if(data.length==0){
                              if(this.table.rolestatus == "ADMIN"){
                                for(let i=1;i<=this.masterRole.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ i +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(i," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                              else if(this.table.rolestatus == "EMPLOYEE"){
                                for(let i=0;i<this.RoleEmployee.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ this.RoleEmployee[i] +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(this.RoleEmployee[i]," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                              else if(this.table.rolestatus == "MANAGER"){
                                for(let i=0;i<this.RoleManager.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ this.RoleManager[i] +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(this.RoleManager[i]," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                              else if(this.table.rolestatus == "SUPERVISOR"){
                                for(let i=0;i<this.RoleSupervisor.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ this.RoleSupervisor[i] +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(this.RoleSupervisor[i]," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                              else if(this.table.rolestatus == "HR-ADMIN"){
                                for(let i=0;i<this.RoleHR_ADMIN.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ this.RoleHR_ADMIN[i] +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(this.RoleHR_ADMIN[i]," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                              else if(this.table.rolestatus == "DC-MANAGER"){
                                for(let i=0;i<this.RoleDcManager.length;i++){
                                    this.http.post(API1 + '/insertUserRole/' + this.table.leaID +'/'+ this.RoleDcManager[i] +'/'+ this.nameInLogin ,{})
                                    .subscribe(data => {
                                        console.log(this.RoleDcManager[i]," InsertUserRole is successfull");
                                        this.router.navigate(['newheader']);
                                    });
                                }
                              }
                            }
                            else{
                                this.router.navigate(['newheader']);
                            }
                        });
                    }else{
                      this.progressBar=false;
                      alert("ท่านอยู่ในสถานะ"+data.maritalStatus+" ไม่สามารถเข้าระบบได้!");
                    }

                    sessionStorage.setItem('logouts', 'false');
                }
              });
              this.progressBar=true;
              this.id = null;
              this.NewPassword = null;
        }

    }



}








