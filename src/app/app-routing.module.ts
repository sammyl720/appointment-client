import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAppointmentGuard } from './guards/edit-appointment.guard';
import { EditComponent } from './pages/edit/edit.component';
import { AppointmentResolver } from './resolvers/appointment.resolver';
import { AvailableAppointmentsResolver } from './resolvers/available-appointments.resolver';
import { EventResolver } from './resolvers/event.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: EditComponent,
    canActivate: [EditAppointmentGuard],
    resolve: {
      appointment: AppointmentResolver,
      available: AvailableAppointmentsResolver,
      event: EventResolver
    }
  },
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
