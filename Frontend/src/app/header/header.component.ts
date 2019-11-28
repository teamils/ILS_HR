import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  data:any={}


       constructor(private router:Router,private route:ActivatedRoute , public dialog: MatDialog) { }
       ngOnInit() {

        this.route.params.subscribe(prams=>{
                   this.data = prams
                   console.log(prams)
                 })
       }
        openDialog(): void {
                   const dialogRef = this.dialog.open(LoginDialog, {
                     width: '330px'
                   });

        }

}


@Component({
  selector: 'login-dialog',
  templateUrl: 'login-dialog.html',
})
export class LoginDialog {

  constructor(
    public dialogRef: MatDialogRef<LoginDialog>
    ) {dialogRef.disableClose = true;}

  closeDialog(): void {
    this.dialogRef.close();
  }

}

