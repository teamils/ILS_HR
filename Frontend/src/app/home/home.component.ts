import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';

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
    public API = '//localhost:8080/';

    employee : Array<any>;
    hide:any;
    id : String = null;
    NewPassword : String = null ;

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

    }

    login(id,NewPassword){
        if(this.id == null) alert("Please enter username");
        else if(this.NewPassword == null) alert("Please enter password");
        else{
              this.service.getUserPassword(id,NewPassword).subscribe(data => {
                if(data == null) alert("UserID and password not complete");
                this.employee = data;
                console.log('Employee In Login ->',data);
                // window.location.reload(true);
                this.table.leaID = data.employeeMasterID;
                this.table.empCode = data.employeeMasterCustomerCode;
                this.table.fName = data.employeeMasterFirstName;
                this.table.lName = data.employeeMasterLastName;

                localStorage.setItem('empId', this.table.leaID);
                localStorage.setItem('empCode', this.table.empCode);
                localStorage.setItem('fName', this.table.fName);
                localStorage.setItem('lName', this.table.lName);
                localStorage.setItem('departmentlogin', data.employeeDepartment);

                if(data != null){
                    this.router.navigate(['newheader']);
                    localStorage.setItem('logouts', 'false');
                    if(data.roleStatus == "EMPLOYEE"){
                      localStorage.setItem('role', 'EMPLOYEE');
                      console.log('role ->',localStorage.getItem('role'));
                    }
                    else if(data.roleStatus == "MANAGER"){
                      localStorage.setItem('role', 'MANAGER');
                      console.log('role ->',localStorage.getItem('role'));
                    }
                    else if(data.roleStatus == "HR"){
                      localStorage.setItem('role', 'HR');
                      console.log('role ->',localStorage.getItem('role'));
                    }
                    else if(data.roleStatus == "SUPERVISOR"){
                      localStorage.setItem('role', 'SUPERVISOR');
                      console.log('role ->',localStorage.getItem('role'));
                    }
                    else /*if(data.roleStatus == "ADMIN")*/{
                      localStorage.setItem('role', 'ADMIN');
                      console.log('role ->',localStorage.getItem('role'));
                    }
                }
              });
              this.id = null;
              this.NewPassword = null;
        }
    }

}








