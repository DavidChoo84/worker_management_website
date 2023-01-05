import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneDetailsComponent } from './zone-details/zone-details.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { ZoneListComponent } from './zone-list/zone-list.component';

const routes: Routes = [
  {path:'',redirectTo: 'zone-list',pathMatch:'full'},
  {path:'zone-list',component: ZoneListComponent},
  {path:'create-zone', component: ZoneFormComponent},
  {path: 'update-zone/:zoneID', component: ZoneFormComponent},
  {path: 'view-zone-details/:zoneID',component: ZoneDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRUDRoutingModule { }