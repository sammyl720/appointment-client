import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, filter, of } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment/appointment.service';
import { IAppointment, IAppointmentsAvailable, ICreateAppointment } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.scss']
})
export class CreateAppointmentComponent {
  @Input() openAppointments!: IAppointmentsAvailable;

  createAppointmentForm = this.fb.group({
    firstName: new FormControl<string>('', [Validators.minLength(3), Validators.required]),
    lastName: new FormControl<string>('', [Validators.minLength(3), Validators.required]),
    email: new FormControl<string>('', [Validators.email, Validators.required]),
    phone: new FormControl<string>('', [Validators.pattern(/^[\+]?[(]?(?<area>[0-9]{3})[)]?[-\s\.]?(?<three>[0-9]{3})[-\s\.]?(?<four>[0-9]{4,6})$/), Validators.required]),
    time: new FormControl<TIME_SLOT>(this.openAppointments?.slots?.[0]?.time, [Validators.pattern(/^(?<hour>\d):(?<minute>00|15|30|45)PM$/), Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private toastService: HotToastService
  ) {

  }

  controlIsInvalid(name: keyof ICreateAppointment) {
    const formControl = this.createAppointmentForm.controls[name];
    return formControl?.dirty &&
      (formControl.dirty || formControl.touched);
  }

  createAppointment() {
    if (this.createAppointmentForm.valid) {
      const appointment: ICreateAppointment = this.createAppointmentForm.getRawValue() as ICreateAppointment;
      this.appointmentService.createAppointment(appointment).
        pipe(
          catchError(error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status >= 400 && error.status < 500) {
                this.toastService.error(error.error?.reason ?? 'Something went wrong', { duration: 15000, dismissible: true })
              }
              else {
                this.toastService.error('Something went wrong', { duration: 15000, dismissible: true });
              }
            }
            return of(null);
          }),
          filter((response): response is IAppointment => !!response)
        )
        .subscribe((response) => {
          const { firstName, lastName, email } = response;
          const messageStr = `Great ${firstName} ${lastName}! We're sending your appointment details to ${email} now`;
          this.toastService.success(messageStr, {
            duration: 10000,
            dismissible: true
          })
          this.router.navigate([response._id])
        })
    }
    else {
      console.log('invalid form');
    }
  }
}
