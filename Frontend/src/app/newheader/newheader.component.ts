import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-newheader',
  templateUrl: './newheader.component.html',
  styleUrls: ['./newheader.component.css']
})
export class NewheaderComponent implements OnInit {

  mobileQuery: MediaQueryList;

  selectEmployeemaster : String;
  selectEmployeeAdd : String;
  selectCreateAccount : String;

private _mobileQueryListener: () => void;

      constructor(changeDetectorRef: ChangeDetectorRef
                  ,media: MediaMatcher
                  ,public dialog: MatDialog
                  ,private router:Router
                  ,private route:ActivatedRoute) {
                          this.mobileQuery = media.matchMedia('(max-width: 600px)');
                          this._mobileQueryListener = () => changeDetectorRef.detectChanges();
                          this.mobileQuery.addListener(this._mobileQueryListener);

                          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
                          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
                          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
      }

      ngOnInit() : void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
      }
      shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

      openDialog(): void {
            const dialogRef = this.dialog.open(LoginDialog, {
                width: '330px'
            });

      }

      callEmployeeMaster(){
          localStorage.setItem('selectEmployeemaster', 'true');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
          /*console.log(this.selectEmployeemaster);*/
      }
      callEmployeeAdd(){
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'true');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectCreateAccount', 'false');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');
      }
      callCreateAccount(){
          localStorage.setItem('selectEmployeemaster', 'false');
          this.selectEmployeemaster =  localStorage.getItem('selectEmployeemaster');
          localStorage.setItem('selectEmployeeAdd', 'false');
          this.selectEmployeeAdd =  localStorage.getItem('selectEmployeeAdd');
          localStorage.setItem('selectCreateAccount', 'true');
          this.selectCreateAccount =  localStorage.getItem('selectCreateAccount');

      }

}

@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {
  hide : boolean;
  panelOpenState : boolean=true;
  constructor(
    public dialogRef: MatDialogRef<LoginDialog>
    ) {dialogRef.disableClose = true;}

  closeDialog(): void {
    this.dialogRef.close();
  }

}
