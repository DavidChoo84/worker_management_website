import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';
// import { AuthguardGuard } from './authguard.guard';

import { SiteComponent } from './site/site.component';

import { ZoneComponent } from './zone/zone.component';
const routes: Routes = [
  {path: '',redirectTo:'zone',pathMatch:'full'},
  {path: 'login', component:LoginComponent},
  {path: 'zone_detail/:site_name/:zone_id', component:ZoneDetailComponent},
  {path: 'zone', component:ZoneComponent},
  {path: 'employee', component:EmployeeComponent},
  {path: 'site', component:SiteComponent},
  {path: 'zone_crud', loadChildren: ()=>import('./zonecrud/crud.module').then(m=>m.CRUDModule)},
  {path: 'employee_crud', loadChildren: () =>import('./employeecrud/employeecrud.module').then(m=>m.EmployeeCRUDModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
