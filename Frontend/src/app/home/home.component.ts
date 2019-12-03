import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ServiceService } from '../service/service.service';
import { HttpClient} from '@angular/common/http';
import {LoginDialog} from '../newheader/newheader.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
panelOpenState : boolean;
showFiller : boolean;
data:any={}
user : null ;
password : null;

public API = '//localhost:8080/ILS_HR';   //for test

constructor(private router:Router,
            private route:ActivatedRoute ,
            public dialog: MatDialog,
             private http: HttpClient,
           ) { }

    ngOnInit() {
        this.route.params.subscribe(prams=>{
                   this.data = prams
                   console.log(prams)
                 });
    }

      openDialog(): void {
                   const dialogRef = this.dialog.open(LoginDialog, {
                     width: '330px'
                   });

        }



}



