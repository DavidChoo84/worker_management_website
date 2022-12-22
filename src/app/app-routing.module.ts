import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';
import { ZoneComponent } from './zone/zone.component';
const routes: Routes = [
  {path:'', redirectTo:'zone', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'zone_detail', component:ZoneDetailComponent},
  {path: 'zone', component:ZoneComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
