import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { HomeComponent } from './home/home.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { NewheaderComponent } from './newheader/newheader.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ApproveBySupervisorComponent } from './approve-by-supervisor/approve-by-supervisor.component';

    const routes: Routes = [
       { path: '', redirectTo: '/newheader', pathMatch: 'full' },
       { path: 'employee-add', component: EmployeeAddComponent },
       { path: 'home', component: HomeComponent },
       { path: 'employee-master', component: EmployeeMasterComponent },
       { path: 'create-account', component: CreateAccountComponent },
       { path: 'newheader', component: NewheaderComponent },
       { path: 'employee-edit', component: EmployeeEditComponent },
       { path: 'attendance', component: AttendanceComponent },
       { path: 'approveBySupervisor', component: ApproveBySupervisorComponent },

    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



