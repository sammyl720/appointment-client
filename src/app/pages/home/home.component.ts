import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { filter, map, Observable, startWith, take } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { EventService } from 'src/app/services/event/event.service';
import { IAppointmentsAvailable, IAppointmentsEvent, IEvent, IEventDetails, isProperApiValue } from 'src/app/types/api.types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showForm = false;
  appointmentContext$: Observable<IAppointmentsEvent>;
  loading$: Observable<boolean>;

  constructor(
    public appointmentService: AppointmentService,
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private toastService: HotToastService
  ) {
    this.appointmentContext$ = this.activatedRoute.data.pipe(
      map(data => ({ event: data['event'], available: (data['available'] ?? [] as IAppointmentsAvailable[]) })));

    this.loading$ = this.appointmentContext$.pipe(
      filter((data) => !!data),
      take(1),
      map(() => false),
      startWith(true)
    )
  }

  toggleFormInView() {
    this.showForm = !this.showForm;
  }

  addEmail(email: string) {
    this.eventService.addEmailToNotify(email).subscribe({
      next: (response) => this.toastService.success(response.message),
      error: error => {
        if (error instanceof HttpErrorResponse) {
          this.toastService.error(error.message)
        }
        else {
          this.toastService.error('Hmmm... something went wrong')
        }
      }
    })
  }
}
