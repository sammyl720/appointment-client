import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailableAppointmentsResolver } from 'src/app/resolvers/available-appointments.resolver';
import { EventResolver } from 'src/app/resolvers/event.resolver';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      available: AvailableAppointmentsResolver,
      event: EventResolver
    }
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class HomeModule { }
