import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { IAppointmentsAvailable, isProperApiValue } from 'src/app/types/api.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  appointmentsAvaliable$: Observable<IAppointmentsAvailable>;

  fetchedAvailable$: Observable<IAppointmentsAvailable | HttpErrorResponse>;

  constructor(
    public appointmentService: AppointmentService
  ) {

    this.fetchedAvailable$ = appointmentService.getAvaliableAppoinments();
    this.appointmentsAvaliable$ = this.fetchedAvailable$.pipe(filter((value): value is IAppointmentsAvailable => isProperApiValue<IAppointmentsAvailable>(value)));
  }
}
