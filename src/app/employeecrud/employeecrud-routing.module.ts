import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {path:'',redirectTo: 'employee-list',pathMatch:'full'},
  {path:'employee-list',component: EmployeeListComponent},
  {path:'add-employee', component: EmployeeFormComponent},
  {path: 'update-employee/:employeeID', component: EmployeeFormComponent},
  {path: 'view-employee-details/:employeeID',component: EmployeeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeCRUDRoutingModule { }