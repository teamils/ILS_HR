import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Router,ActivatedRoute} from "@angular/router";
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef,  OnDestroy} from '@angular/core';
import { ServiceService } from '../service/service.service';
@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  employee : Array<any>;
  CurrentDateTime = new Date();

  constructor(public dialogRef: MatDialogRef<EmployeeEditComponent>
                  ,hangeDetectorRef: ChangeDetectorRef
                  ,media: MediaMatcher
                  ,public dialog: MatDialog
                  ,private router:Router
                  ,private route:ActivatedRoute
                  ,private service:ServiceService) {
        dialogRef.disableClose = true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
        this.service.getemployee().subscribe(data => {
                    console.log(this.CurrentDateTime);
                   this.employee = data;
                   console.log(this.employee);

        });
  }

}
