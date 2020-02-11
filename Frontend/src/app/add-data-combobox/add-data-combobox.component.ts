import { Component, OnInit } from '@angular/core';
import { ViewChild,Inject  } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../service/service.service';
import {  MatPaginator, MatTableDataSource } from '@angular/material';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { API1 } from '../app.component';
import { Pipe, PipeTransform} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AttendanceShowLeavenumberComponent } from '../attendance-show-leavenumber/attendance-show-leavenumber.component';

@Component({
  selector: 'app-add-data-combobox',
  templateUrl: './add-data-combobox.component.html',
  styleUrls: ['./add-data-combobox.component.css']
})
export class AddDataComboboxComponent implements OnInit {

  NewBank:Array<any>;
  bankName:String='';
  department:Array<any>;
  departmentInput:String='';
  position:Array<any>;
  positionInput:String='';
  education:Array<any>;
  educationInput:String='';
  employeeType:Array<any>;
  employeeTypeInput:String='';
  empStatus:Array<any>;
  empStatusInput:String='';
  gender:Array<any>;
  genderInput:String='';
  prefix:Array<any>;
  prefixInput:String='';
  masterAttendance:Array<any>;
  masterAttendance_year:number;
  masterAttendance_leaveDay:number;
  nameInLogin = sessionStorage.getItem('nameInLogin');
  constructor(private service:ServiceService,
            private router:Router,
            private route:ActivatedRoute,
            public dialog: MatDialog,
             private http: HttpClient) { }

  ngOnInit() {
      console.log(this.nameInLogin);
      this.service.getBank().subscribe(data => {
          this.NewBank = data;
          //console.log('NewBank == ',this.NewBank);
      });
      this.service.getDepartment().subscribe(data => {
          this.department = data;
          //console.log('department == ',this.department);
      });
      this.service.getPosition().subscribe(data => {
          this.position = data;
          //console.log('position == ',this.position);
      });
      this.service.getEducation().subscribe(data => {
          this.education = data;
          //console.log('education == ',this.education);
      });
      this.service.getEmployeeType().subscribe(data => {
          this.employeeType = data;
          //console.log('employeeType == ',this.employeeType);
      });
      this.service.getEmpStatus().subscribe(data => {
          this.empStatus = data;
          //console.log('empStatus == ',this.empStatus);
      });
      this.service.getGender2().subscribe(data => {
          this.gender = data;
          //console.log('gender == ',this.gender);
      });
      this.service.getPrefix().subscribe(data => {
          this.prefix = data;
          //console.log('prefix == ',this.prefix);
      });
      this.service.getMasterAttendance().subscribe(data => {
          this.masterAttendance = data;
          //console.log('masterAttendance == ',this.masterAttendance);
      });

  }
  /*--------------------------------BANK-------------------------------------------*/
  InsertBank(){
    this.http.post(API1 + '/insertBank/' + this.bankName +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.bankName='';
        }
    );
  }
  DeleteBank(row : any){
    this.http.delete(API1 + '/deleteBank/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.bankName='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------DEPARTMENT-------------------------------------------*/
  InsertDepartment(){
    this.http.post(API1 + '/insertDepartment/' + this.departmentInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.departmentInput='';
        }
    );
  }
  DeleteDepartment(row : any){
    this.http.delete(API1 + '/deleteDepartment/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.departmentInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
 /*--------------------------------POSITION-------------------------------------------*/
  InsertPosition(){
    this.http.post(API1 + '/insertPosition/' + this.positionInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.positionInput='';
        }
    );
  }
  DeletePosition(row : any){
    this.http.delete(API1 + '/deletePosition/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.positionInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
/*--------------------------------EDUCTION-------------------------------------------*/
  Inserteducation(){
    this.http.post(API1 + '/inserteducation/' + this.educationInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.educationInput='';
        }
    );
  }
  Deleteeducation(row : any){
    this.http.delete(API1 + '/deleteeducation/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.educationInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------EmployeeType-------------------------------------------*/
  InsertEmployeeType(){
    this.http.post(API1 + '/insertEmployeeType/' + this.employeeTypeInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.employeeTypeInput='';
        }
    );
  }
  DeleteEmployeeType(row : any){
    this.http.delete(API1 + '/deleteEmployeeType/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.employeeTypeInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------EmpStatus-------------------------------------------*/
  InsertEmpStatus(){
    this.http.post(API1 + '/insertEmpStatus/' + this.empStatusInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.empStatusInput='';
        }
    );
  }
  DeleteEmpStatus(row : any){
    this.http.delete(API1 + '/deleteEmpStatus/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.empStatusInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------Gender-------------------------------------------*/
  InsertGender(){
    this.http.post(API1 + '/insertGender/' + this.genderInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.genderInput='';
        }
    );
  }
  DeleteGender(row : any){
    this.http.delete(API1 + '/deleteGender/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.genderInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------Prefix-------------------------------------------*/
  InsertPrefix(){
    this.http.post(API1 + '/insertPrefix/' + this.prefixInput +'/'+ this.nameInLogin,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.prefixInput='';
        }
    );
  }
  DeletePrefix(row : any){
    this.http.delete(API1 + '/deletePrefix/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.prefixInput='';
        }
    );
  }
  /*--------------------------------------------------------------------------------*/
  /*--------------------------------MasterAttendance-------------------------------------------*/
  num:Array<any> = [];
  sortEggsInNest(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  }
  InsertMasterAttendance(){
      for(let i=0;i<this.masterAttendance.length;i++){
          this.num[i] = this.masterAttendance[i].year;
      }
      this.num.sort(this.sortEggsInNest);
      if(this.masterAttendance_year > this.num.length){
          alert("คุณต้องADDข้อมูลของ"+this.num.length+" ปี");
      }
      else if(this.masterAttendance_year < this.num.length){
          alert("คุณต้องADDข้อมูลของ"+this.num.length+" ปี");
      }
      else{
          this.http.post(API1 + '/insertMasterAttendance/' + this.masterAttendance_year +'/'+ this.masterAttendance_leaveDay +'/'+ this.nameInLogin,{})
            .subscribe(
              data => {
                this.RefreshTable();
                console.log(data);
                this.masterAttendance_year=null;
                this.masterAttendance_leaveDay=null;
              }
          );
      }
  }
  OpenDaialog_EditMasterAttendanceDialog(row : any){
              const dialogRef = this.dialog.open(EditMasterAttendanceDialog, {
                    width: '400px',
                    height:'400px',
                    data: row,
              });
              this.RefreshTable();
  }
  DeleteMasterAttendance(row : any){
    this.http.delete(API1 + '/deleteMasterAttendance/' + row ,{})
      .subscribe(
        data => {
          this.RefreshTable();
          this.masterAttendance_year=null;
          this.masterAttendance_leaveDay=null;
        }
    );
  }
  /*--------------------------------------------------------------------------------*/

  RefreshTable(){
    setTimeout(() => {
      this.service.getBank().subscribe(data => {
          this.NewBank = data;
          //console.log('NewBank == ',this.NewBank);
      });
      this.service.getDepartment().subscribe(data => {
          this.department = data;
          //console.log('department == ',this.department);
      });
      this.service.getPosition().subscribe(data => {
          this.position = data;
          //console.log('position == ',this.position);
      });
      this.service.getEducation().subscribe(data => {
          this.education = data;
          //console.log('education == ',this.education);
      });
      this.service.getEmployeeType().subscribe(data => {
          this.employeeType = data;
          //console.log('employeeType == ',this.employeeType);
      });
      this.service.getEmpStatus().subscribe(data => {
          this.empStatus = data;
          //console.log('empStatus == ',this.empStatus);
      });
      this.service.getGender2().subscribe(data => {
          this.gender = data;
          //console.log('gender == ',this.gender);
      });
      this.service.getPrefix().subscribe(data => {
          this.prefix = data;
          //console.log('prefix == ',this.prefix);
      });
      this.service.getMasterAttendance().subscribe(data => {
          this.masterAttendance = data;
          //console.log('masterAttendance == ',this.masterAttendance);
      });
    }, 200);
  }

}



//Dialog EditMasterAttendanceDialog
export interface DialogData {
    year: any;
    dayLeave: any;
    masterAttendanceID: any;
}
@Component({
    selector: 'editMasterAttendanceDialog',
    templateUrl: 'editMasterAttendanceDialog.html',
  })
export class EditMasterAttendanceDialog {
  nameInLogin = sessionStorage.getItem('nameInLogin');
    year:any;
    dayLeave:any;
    masterAttendanceID:any;

    constructor(public dialogRef: MatDialogRef<EditMasterAttendanceDialog> , public service:ServiceService,@Inject(MAT_DIALOG_DATA)  public data: DialogData,private http: HttpClient){
          dialogRef.disableClose = false;
          this.masterAttendanceID = data.masterAttendanceID;
          this.year = data.year;
          this.dayLeave = data.dayLeave;
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

    EditVacationDay(){
        this.http.post(API1 + '/editmasterAttendance/' + this.masterAttendanceID +'/'+ this.dayLeave +'/'+ this.nameInLogin,{})
            .subscribe(
              data => {
                    alert("Edit successfull");
                    console.log(data);
                    this.dialogRef.close();
              }
          );
    }


}
