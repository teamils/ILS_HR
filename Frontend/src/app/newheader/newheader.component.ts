import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import { ServiceService } from '../service/service.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { Inject} from '@angular/core';

export interface DialogData {
  employee : Array<any>;
  id : String ;
  NewPassword : String ;

}

@Component({
  selector: 'app-newheader',
  templateUrl: './newheader.component.html',
  styleUrls: ['./newheader.component.css']
})
export class NewheaderComponent implements OnInit {

  mobileQuery: MediaQueryList;

  selectHome : String;
  selectEmployeemaster : String;
  selectEmployeeAdd : String;
  selectCreateAccount : String;
  selectAttendance : String;
  selectAttendanceDate : String;

  employee : Array<any>;
  id : String ;
  NewPassword : String ;
  NewemployeeMasterFirstName : string;

private _mobileQueryListener: () => void;

      constructor(changeDetectorRef: ChangeDetectorRef
                  ,media: MediaMatcher
                  ,public dialog: MatDialog
                  ,private router:Router
                  ,private route:ActivatedRoute
                  ) {
                          this.mobileQuery = media.matchMedia('(max-width: 600px)');
                          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
                          this.mobileQuery.addListener(this._mobileQueryListener);

                          localStorage.setItem('selectAttendanceDate', 'true');
                          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
      }

key : string;

      ngOnInit() : void {
        this.key = localStorage.getItem('role');
        this.mobileQuery.removeListener(this._mobileQueryListener);

      }
      shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));


      openLoginDialogComponent(){
            const dialogRef = this.dialog.open(LoginDialogComponent, {
                  width: '330px',
                 data: {id: this.id, NewPassword: this.NewPassword, employee:this.employee}

            });
      }

      callEmployeeMaster(){
          localStorage.setItem('selectEmployeemaster', 'true');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');

          /*console.log(this.selectEmployeemaster);*/
      }
      callEmployeeAdd(){
          localStorage.setItem('selectEmployeeAdd', 'true');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
      }
      callCreateAccount(){
          localStorage.setItem('selectCreateAccount', 'true');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
      }
      callAttendance(){
          localStorage.setItem('selectAttendance', 'true');
          this.selectAttendance =  localStorage.getItem('selectAttendance');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
          localStorage.setItem('selectAttendanceDate', 'false');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
      }
      callAttendanceData(){
          localStorage.setItem('selectAttendanceDate', 'true');
          this.selectAttendanceDate =  localStorage.getItem('selectAttendanceDate');
          localStorage.setItem('selectAttendance', 'false');
          this.selectAttendance =  localStorage.getItem('selectAttendance')
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');

      }

}


