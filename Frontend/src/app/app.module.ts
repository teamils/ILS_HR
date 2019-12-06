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
import {LoginDialog} from './newheader/newheader.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NewheaderComponent } from './newheader/newheader.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { AttendanceComponent } from './attendance/attendance.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginDialog,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeMasterComponent,
    CreateAccountComponent,
    NewheaderComponent,
    EmployeeEditComponent,
    EmployeeDeleteComponent,
    AttendanceComponent,





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



       ],
       exports: [
            MatTableModule,
            MatPaginatorModule,
            MatSortModule,

       ],

   entryComponents: [LoginDialog, EmployeeEditComponent,EmployeeDeleteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


