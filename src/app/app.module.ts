import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeaderNameIdComponent } from './header-name-id/header-name-id.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { EmployeeComponent } from './employee/employee.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { SpeedDialModule } from 'primeng/speeddial';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HeaderNameIdComponent,
    SideMenuComponent,
    EmployeeComponent,
    ZoneDetailComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule,
HttpClientModule,
ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ToolbarModule,
    AutoCompleteModule,
    CalendarModule,
    SplitButtonModule,
    ToastModule,
    SpeedDialModule,
    ConfirmDialogModule,
    TableModule,
    ProgressBarModule,
    DropdownModule,
    MultiSelectModule,
    NgxQRCodeModule,
    DialogModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
