import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from "rxjs";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import { ServiceService } from './Service/service.service';
import { Router } from '@angular/router';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';

export interface DialogData {
    animal: string;
    name: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    isLoginSubject = new BehaviorSubject<boolean>(this.hasTokenId());
    isLoginHR = new BehaviorSubject<boolean>(this.hasTokenIdHR());
    isLoginAdmin = new BehaviorSubject<boolean>(this.hasTokenIdAdmin());
    isLoginSupervisor = new BehaviorSubject<boolean>(this.hasTokenSupervisor());
    isLoginManager = new BehaviorSubject<boolean>(this.hasTokenIdManager());

    constructor(public dialog: MatDialog , private service : ServiceService, private router: Router) { }
}
