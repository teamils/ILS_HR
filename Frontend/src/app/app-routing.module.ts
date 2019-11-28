import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { HomeComponent } from './home/home.component';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { CreateAccountComponent } from './create-account/create-account.component';

    const routes: Routes = [
       { path: '', redirectTo: '/home', pathMatch: 'full' },
       { path: 'header', component: HeaderComponent },
       { path: 'employee-add', component: EmployeeAddComponent },
       { path: 'home', component: HomeComponent },
       { path: 'employee-master', component: EmployeeMasterComponent },
       { path: 'create-account', component: CreateAccountComponent },
    ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



