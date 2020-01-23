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
import * as XLSX from 'xlsx';
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
                    for(let i of this.employee){
                        i.employeeMasterBirthDate = this.SplitDate(i.employeeMasterBirthDate);
                        i.employeeMasterStartDate = this.SplitDate(i.employeeMasterStartDate);
                    }
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
              รหัสพนักงาน : this.employee[i].employeeMasterCustomerCode,
              คำนำหน้า : this.employee[i].prefix,
              ชื่อ : this.employee[i].employeeMasterFirstName,
              นามสกุล : this.employee[i].employeeMasterLastName,
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
              RoleStatus : this.employee[i].roleStatus,
            });
        }
        this.excelService.exportAsExcelFile(dataemployee, 'Data-Employee');
    }

  SplitDate(date:any){
    var DateSplitted = date.split("-");
    return DateSplitted[2] +"-"+ DateSplitted[1] +"-"+ DateSplitted[0];
  }

  dataExport:any;
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      //console.log(jsonData);
      for(let i = 0 ; i < jsonData.data.length ; i++){
          this.dataExport = {
            employeeMasterCustomerCode:jsonData.data[i].รหัสพนักงาน ,
            prefix:jsonData.data[i].คำนำหน้า ,
            employeeMasterFirstName:jsonData.data[i].ชื่อ ,
            employeeMasterLastName:jsonData.data[i].นามสกุล ,
            employeeMasterNickName:jsonData.data[i].ชื่อเล่น ,
            employeeMasterGender:jsonData.data[i].เพศ ,
            employeeMasterBirthDate:jsonData.data[i].วันเกิด  ,
            maritalStatus:jsonData.data[i].สถานะทำงาน ,
            employeeMasterPersonID:jsonData.data[i].รหัสประจำตัวประชาชน ,
            employeeMasterTel1:jsonData.data[i].เบอร์โทร ,
            empEmail:jsonData.data[i].อีเมล ,
            employeeMasterStartDate:jsonData.data[i].วันเริ่มงาน ,
            empAddressReal:jsonData.data[i].ที่อยู่ตามบัตรประชาชน ,
            empAddressPerson:jsonData.data[i].ที่อยู่ปัจจุบัน ,
            emergencyContact:jsonData.data[i].ผู้ที่ติดต่อในกรณีฉุกเฉิน ,
            employeeDepartment:jsonData.data[i].เเผนก ,
            employeePosition:jsonData.data[i].ตำเเหน่ง ,
            employeeType:jsonData.data[i].ประเภทการทำงาน ,
            education:jsonData.data[i].วุฒิการศึกษา ,
            bank:jsonData.data[i].ธนาคาร ,
            bankNumber:jsonData.data[i].เลขบัญชี ,
            roleStatus:jsonData.data[i].RoleStatus ,
          };
          //console.log(this.dataExport);
          this.http.post(API1 +'importData/'+this.CalculateGeneralDate(this.dataExport.employeeMasterBirthDate) +'/'+ this.CalculateGeneralDate(this.dataExport.employeeMasterStartDate), JSON.stringify(this.dataExport),{headers: {"Content-Type": "application/json"}})
                      .subscribe(
                                     data => {
                                         console.log('Import data is successful');
                                         alert("Import Data is successful");
                                     },
                                     error => {
                                         console.log('Error', error);
                                     }
                       );
      }
    }
    reader.readAsBinaryString(file);
  }


  CalculateGeneralDate(generalDate:any){
      let date = new Date('1900-1-1');
      date.setDate(date.getDate()+generalDate-2);
      //console.log(date);
      return date;
  }


}


