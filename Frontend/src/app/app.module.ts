import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  MatAutocompleteModule,
          MatBadgeModule,
          MatBottomSheetModule,
          MatButtonModule,
          MatButtonToggleModule,
          MatCardModule,
          MatCheckboxModule,
          MatChipsModule,
          MatDatepickerModule,
          MatDialogModule,
          MatDividerModule,
          MatExpansionModule,
          MatGridListModule,
          MatIconModule,
          MatInputModule,
          MatListModule,
          MatMenuModule,
          MatNativeDateModule,
          MatPaginatorModule,
          MatProgressBarModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatRippleModule,
          MatSelectModule,
          MatSidenavModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatSnackBarModule,
          MatSortModule,
          MatStepperModule,
          MatTableModule,
          MatTabsModule,
          MatToolbarModule,
          MatTooltipModule,
          MatTreeModule,

        } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NewheaderComponent } from './newheader/newheader.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AttendanceDataComponent } from './attendance-data/attendance-data.component';
import { AttendanceDeleteDialog } from './attendance-data/attendance-data.component';
import { AttendanceCancelDialog } from './attendance/attendance.component';
import { ApproveBySupervisorComponent } from './approve-by-supervisor/approve-by-supervisor.component';
import { ApproveByManagerComponent } from './approve-by-manager/approve-by-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeMasterComponent,
    CreateAccountComponent,
    NewheaderComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    AttendanceComponent,
    LoginDialogComponent,
    AttendanceDataComponent,
    AttendanceDeleteDialog,
    ApproveBySupervisorComponent,
    AttendanceCancelDialog,
    ApproveByManagerComponent,

  ],

      imports: [
          BrowserModule,
          AppRoutingModule,
          BrowserAnimationsModule,
          MatAutocompleteModule,
          MatBadgeModule,
          MatBottomSheetModule,
          MatButtonModule,
          MatButtonToggleModule,
          MatCardModule,
          MatCheckboxModule,
          MatChipsModule,
          MatDatepickerModule,
          MatDialogModule,
          MatDividerModule,
          MatExpansionModule,
          MatGridListModule,
          MatIconModule,
          MatInputModule,
          MatListModule,
          MatMenuModule,
          MatNativeDateModule,
          MatPaginatorModule,
          MatProgressBarModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatRippleModule,
          MatSelectModule,
          MatSidenavModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatSnackBarModule,
          MatSortModule,
          MatStepperModule,
          MatTableModule,
          MatTabsModule,
          MatToolbarModule,
          MatTooltipModule,
          MatTreeModule,
          FormsModule,
          HttpClientModule,
          MatFormFieldModule,
          NgxMaterialTimepickerModule,

       ],
       exports: [
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,

       ],

   entryComponents: [EmployeeEditComponent,EmployeeDeleteComponent,LoginDialogComponent,AttendanceDeleteDialog,AttendanceCancelDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


