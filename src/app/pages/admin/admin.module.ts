import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';

import { SharedModule } from 'src/app/shared/shared/shared.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { DisplayAppointmentComponent } from './components/display-appointment/display-appointment.component';
import { MatListModule } from '@angular/material/list';
import { AppointmentsTableComponent } from './components/appointments-table/appointments-table.component';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    CreateEventComponent,
    DisplayAppointmentComponent,
    AppointmentsTableComponent
  ],
  imports: [
    AdminRoutingModule,
    MatSortModule,
    CommonModule,
    MatListModule,
    MatTableModule,
    SharedModule
  ]
})
export class AdminModule { }
