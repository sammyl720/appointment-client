import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EventDetailsComponent } from 'src/app/components/event-details/event-details.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    MatTableModule,
    SharedModule
  ]
})
export class AdminModule { }
