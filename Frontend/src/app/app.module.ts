import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginDialog} from './header/header.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

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
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { CreateAccountComponent } from './create-account/create-account.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginDialog,
    EmployeeAddComponent,
    HomeComponent,
    EmployeeMasterComponent,
    CreateAccountComponent,

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

   entryComponents: [LoginDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


