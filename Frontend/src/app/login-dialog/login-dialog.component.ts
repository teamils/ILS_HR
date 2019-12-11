import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  public API = '//localhost:8080/';

  employee : Array<any>;

  id : String = null;
  NewPassword : String = null ;

    constructor(
      public dialogRef: MatDialogRef<LoginDialogComponent>
                      ,changeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient){
                            dialogRef.disableClose = true;
      }

  ngOnInit() {


  }
  login(id,NewPassword){
        this.service.getUserPassword(id,NewPassword).subscribe(data => {
               this.employee = data;
               console.log('Employee In Login ->',data);
        if(data != null){
          this.dialogRef.close();
        }
        else if(this.id == null){
          alert("Please enter username");
        }
        else if(this.NewPassword == null){
          alert("Please enter password");
        }
        else{
              alert("UserID and password not complete");
        }
      });
  }

   closeDialog(): void {
    this.dialogRef.close();
  }

}




