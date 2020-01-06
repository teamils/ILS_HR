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
import { NewheaderComponent } from './newheader/newheader.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { AttendanceComponent } from './attendance/attendance.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { AttendanceDataComponent } from './attendance-data/attendance-data.component';
import { AttendanceDeleteDialog } from './attendance-data/attendance-data.component';
import { AttendanceCancelDialog } from './attendance/attendance.component';
import { ApproveBySupervisorComponent } from './approve-by-supervisor/approve-by-supervisor.component';
import { ReasonNotApproveDialog } from './approve-by-supervisor/approve-by-supervisor.component';
import { ApproveByManagerComponent } from './approve-by-manager/approve-by-manager.component';
import { ReasonNotApproveBygerDialog } from './approve-by-manager/approve-by-manager.component';
import { AttendanceShowLeavenumberComponent } from './attendance-show-leavenumber/attendance-show-leavenumber.component';
import { EditPersonalInformationComponent } from './edit-personal-information/edit-personal-information.component';
import { EditPaymentDialog } from './attendance-data/attendance-data.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeMasterComponent,
    NewheaderComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    AttendanceComponent,
    AttendanceDataComponent,
    AttendanceDeleteDialog,
    ApproveBySupervisorComponent,
    AttendanceCancelDialog,
    ApproveByManagerComponent,
    ReasonNotApproveDialog,
    ReasonNotApproveBygerDialog,
    AttendanceShowLeavenumberComponent,
    EditPersonalInformationComponent,
    EditPaymentDialog,
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

   entryComponents: [EmployeeEditComponent,
                    EmployeeDeleteComponent,
                    AttendanceDeleteDialog,
                    AttendanceCancelDialog,
                    ReasonNotApproveDialog,
                    ReasonNotApproveBygerDialog,
                    AttendanceShowLeavenumberComponent,
                    EditPersonalInformationComponent,
                    EditPaymentDialog,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


