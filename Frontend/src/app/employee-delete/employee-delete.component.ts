import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';

export interface DialogData {
  employeeMasterID : null;
  isActive: string;
}

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
    public API = '//localhost:8080/';
    hide : boolean;
    panelOpenState : boolean=true;
    NewIsActive: string;
    NewemployeeMasterID:null;
    constructor(
      public dialogRef: MatDialogRef<EmployeeDeleteComponent>
                      ,changeDetectorRef: ChangeDetectorRef
                      ,media: MediaMatcher
                      ,public dialog: MatDialog
                      ,private router:Router
                      ,private route:ActivatedRoute
                      ,private service:ServiceService
                      ,private http: HttpClient
                      , @Inject(MAT_DIALOG_DATA)  public date: DialogData){
                            dialogRef.disableClose = true;
      }

  closeDialog(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.NewIsActive = this.date.isActive;
    this.NewemployeeMasterID = this.date.employeeMasterID;
  }

  DeleteEmployee(){
             this.http.post(this.API + '/deleteEmployee/' + this.NewemployeeMasterID +'/'+ this.NewIsActive ,{})
                                   .subscribe(
                                       data => {
                                           console.log('PUT Request is successful');
                                           window.location.reload(true);
                                       },
                                       error => {
                                           console.log('Error', error);
                                       }
                                    );

      }

}


