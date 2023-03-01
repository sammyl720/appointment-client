import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditAppointmentGuard } from './guards/edit-appointment.guard';
import { EditComponent } from './pages/edit/edit.component';
import { AppointmentResolver } from './resolvers/appointment.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: EditComponent,
    canActivate: [EditAppointmentGuard],
    resolve: {
      appointment: AppointmentResolver
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
