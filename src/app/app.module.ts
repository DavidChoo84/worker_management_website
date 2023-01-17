// @ANGULAR ITEM
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes }   from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// MAIN ITEM
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// COMPONENT
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EmployeeComponent } from './employee/employee.component';
import { ZoneDetailComponent } from './zone-detail/zone-detail.component';
import { ZoneComponent } from './zone/zone.component';

// PRIMENG
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

// ANGULAR MATERIAL;
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { SiteComponent } from './site/site.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NavbarService } from './navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    EmployeeComponent,
    ZoneDetailComponent,
    HomeComponent,
    ZoneComponent,
    SiteComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
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
    BrowserAnimationsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatTooltipModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatPaginatorModule,
    Ng2SearchPipeModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideMessaging(() => getMessaging())
  ],
  providers: [NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
