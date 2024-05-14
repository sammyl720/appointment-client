import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, filter, map, Observable, of, startWith, take } from 'rxjs';
import { CancelAppointmentComponent } from 'src/app/components/modals/cancel-appointment/cancel-appointment.component';
import { EditAppointmentComponent } from 'src/app/components/modals/edit-appointment/edit-appointment.component';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { IAppointment, IAppointmentsAvailable, IAppointmentsEvent } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  appointment$: Observable<IAppointment>;
  available$: Observable<IAppointmentsAvailable>;
  context$: Observable<IAppointmentsEvent>;
  loading$: Observable<boolean>;
  apiUrl = environment.apiUrl;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appointmentService: AppointmentService,
    private toastService: HotToastService,
    private dialog: MatDialog
  ) {
    this.appointment$ = this.activatedRoute.data.pipe(
      map(data => data['appointment']),
      filter(app => !!app)
    )

    this.available$ = this.activatedRoute.data.pipe(
      map(data => data['available']),
      filter(app => !!app)
    );

    this.context$ = this.activatedRoute.data as Observable<IAppointmentsEvent>;
    this.loading$ = this.context$.pipe(
      filter(hasData => !!hasData),
      map(data => !data),
      take(1),
      startWith(true)
    )
  }

  editAppointment(current: TIME_SLOT) {
    const id = this.getAppointmentId();
    const available = (this.activatedRoute.snapshot.data['available'] as IAppointmentsAvailable)?.slots;
    if (!id || !available?.length) {
      this.toastService.error('Something went wrong');
      return;
    }

    this.dialog.open(EditAppointmentComponent, {
      data: {
        available,
        current
      }
    }).afterClosed().pipe(take(1)).subscribe(newTime => {
      if (!!newTime) {
        this.editAppointmentTime(id, newTime);
      }
    })
  }

  deleteAppointment() {
    const id = this.getAppointmentId();
    if (!id) {
      this.toastService.error(`Something went wrong`);
      return;
    }

    this.dialog.open(CancelAppointmentComponent).afterClosed().pipe(take(1)).subscribe(cancel => {
      if (!!cancel) {
        this.cancelAppointment(id);
      }
    })

  }

  private cancelAppointment(id: string) {
    this.appointmentService.deleteAppointment(id).pipe(
      catchError((error) => {
        this.toastService.error(error?.message);
        return of(null);
      })
    ).subscribe(result => {
      if (!!result) {
        this.toastService.success('Deleted Appointment');
        this.router.navigate(['']);
      }
    })
  }

  private editAppointmentTime(id: string, time: TIME_SLOT) {
    this.appointmentService.updateAppointmentTime(id, time).pipe(
      catchError((error) => {
        this.toastService.error(error?.reason ?? error?.message);
        return of(null);
      })
    ).subscribe(result => {
      if (!!result) {
        this.toastService.success('Your appointment has been rescheduled');
        this.router.navigate([id]);
      }
    })
  }

  getAppointmentId() {
    const id = this.activatedRoute.snapshot.params['id'];
    return id;
  }

  get calendarUrl() {
    return `${this.apiUrl}/appointments/${this.getAppointmentId()}/calendar`;
  }

  getMapUrl(address: string) {
    const url = new URL(`http://maps.google.com`);
    url.searchParams.append('q', address);
    return url.href;
  }
}
