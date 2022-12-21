import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

const routes: Routes = [
  {path:'',redirectTo:'zone_crud',pathMatch:'full'},
  {path: 'zone_crud', loadChildren: ()=>import('./zonecrud/crud.module').then(m=>m.CRUDModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
