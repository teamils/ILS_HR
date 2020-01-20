import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { ServiceService } from '../service/service.service';
import { ExcelService } from '../excel.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import {MatBottomSheet,MatBottomSheetRef} from '@angular/material';
import {  SelectionModel } from '@angular/cdk/collections';
import {  DatePipe} from '@angular/common';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import { NewheaderComponent } from '../newheader/newheader.component';
import { EmployeeDeleteComponent } from '../employee-delete/employee-delete.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { API1 } from '../app.component';

export interface Emp{
    employeeMasterID : any;
    create_date: any;
    create_by: any;
    update_date: any;
    update_by: any;
    employeeMasterCustomerCode: any;
    prefix: any;
    employeeMasterFirstName: any;
    employeeMasterLastName: any;
    employeeMasterNickName: any;
    employeeMasterGender: any;
    maritalStatus: any;
    employeeMasterBirthDate: any;
    employeeMasterPersonID: any;
    employeeMasterTel1: any;
    empEmail: any;
    empAddressReal: any;
    empAddressPerson: any;
    emergencyContact: any;
    employeeMasterStartDate: any;
    employeePosition: any;
    departmentid: any;
    employeeType: any;
    education: any;
    bank: any;
    bankNumber: any;
    isActive: any;
    roleStatus: any;
    password: any;
}

@Component({
  selector: 'app-employee-master',
  templateUrl: './employee-master.component.html',
  styleUrls: ['./employee-master.component.css']
})


export class EmployeeMasterComponent implements OnInit {
    onHide : boolean;
    data:any={}
    employee : Array<any>;
    employeeSelect : '';
    dataSearch: null;
    accountuser : Array<any>;
    progressBar=false;
    pipe = new DatePipe('en-TH');
    displayedColumns: string[] = [/*'select',*/'number','empCodeID'/*,'prefix'*/,'empFristName','empLastName',/*'NickName',*/'Gender'/*,'Status','BirthDate'*/ /*,'Age'*/ ,'PersonID','Tel1'/*,'Email','AddressReal','AddressPerson'*/,'StartDate','Position','Department','empType'/*,'educations'*//*,'bank','bankNumber'*/,'del','Edit'];
    dataSource = new MatTableDataSource<Emp>(this.employee);
    selection = new SelectionModel<Emp>(true, []);
    @ViewChild(MatPaginator, {static : true}) paginator : MatPaginator;
    @ViewChild(MatSort, {static : true}) sort: MatSort;

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
      }


    /** Selects all rows if they are not all selected; otherwise clear selection. */
      masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
      }

      /** The label for the checkbox on the passed row */


     applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }

      constructor(private router:Router,
                private route:ActivatedRoute ,
                public dialog: MatDialog,
                 private http: HttpClient,
                private service:ServiceService,
                private excelService:ExcelService) { }

        ngOnInit() {
            this.progressBar=true;
            this.service.getemployee().subscribe(data => {
                    this.progressBar=false;
                   this.employee = data;
                    this.dataSource.data = this.employee;
                    //console.log('employee->',this.employee);
              });
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;


        }
        startwork: Array<any>;
        datemmddyy(data : any){
            for (let i of data) {
                //console.log(i.employeeMasterStartDate);
                this.startwork = i.employeeMasterStartDate
                  //console.log('startwork',this.startwork);
            }

        }
          DeleteEmployeeMaster(row : any){
            const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
                  width: '300px',
                  height:'200px',
                  data: row,
            });
          }
          OpenEditDialogComponent(row : any){
               const dialogRef = this.dialog.open(EmployeeEditComponent, {
                   width: '90%',
                   height:'90%',
                   data: row,
              });
          }

    exportexcel(): void{
        let dataemployee : any[] = [];
        for(let i = 0 ; i < this.employee.length ; i++){
            dataemployee.push({
              สำดับ : i+1,
              คำนำหน้า : this.employee[i].prefix,
              รหัสพนักงาน : this.employee[i].employeeMasterCustomerCode,
              ชื่อ_สกุล : this.employee[i].employeeMasterFirstName+" "+this.employee[i].employeeMasterLastName,
              ชื่อเล่น : this.employee[i].employeeMasterNickName,
              เพศ : this.employee[i].employeeMasterGender,
              วันเกิด : this.employee[i].employeeMasterBirthDate,
              สถานะทำงาน : this.employee[i].maritalStatus,
              รหัสประจำตัวประชาชน : this.employee[i].employeeMasterPersonID,
              เบอร์โทร : this.employee[i].employeeMasterTel1,
              อีเมล : this.employee[i].empEmail,
              วันเริ่มงาน : this.employee[i].employeeMasterStartDate,
              ที่อยู่ตามบัตรประชาชน : this.employee[i].empAddressReal,
              ที่อยู่ปัจจุบัน : this.employee[i].empAddressPerson,
              ผู้ที่ติดต่อในกรณีฉุกเฉิน : this.employee[i].emergencyContact,
              เเผนก : this.employee[i].departmentid.departmentName,
              ตำเเหน่ง : this.employee[i].employeePosition,
              ประเภทการทำงาน : this.employee[i].employeeType,
              วุฒิการศึกษา : this.employee[i].education,
              ธนาคาร : this.employee[i].bank,
              เลขบัญชี : this.employee[i].bankNumber,
            });
        }
        this.excelService.exportAsExcelFile(dataemployee, 'Data-Employee');
    }


}


