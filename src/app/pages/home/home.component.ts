import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { IAppointmentsAvailable, IAppointmentsEvent, IEvent, IEventDetails, isProperApiValue } from 'src/app/types/api.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showForm = true;
  appointmentsAvaliable$: Observable<IAppointmentsAvailable>;
  eventDetails$: Observable<IEvent>;
  appointmentContext$: Observable<IAppointmentsEvent>;

  constructor(
    public appointmentService: AppointmentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.appointmentsAvaliable$ = this.activatedRoute.data.pipe(
      map(data => data['available']),
      filter(app => !!app)
    );
    this.eventDetails$ = this.activatedRoute.data.pipe(
      map(data => data['event']),
      filter(e => !!e)
    );
    this.appointmentContext$ = this.activatedRoute.data.pipe(
      map(data => ({ event: data['event'], available: data['available'] }))
    );
  }

  toggleFormInView() {
    this.showForm = !this.showForm;
  }
}
