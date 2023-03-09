import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AppointmentService } from '../services/appointment/appointment.service';
import { IAppointmentsAvailable, isProperApiValue } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class AvailableAppointmentsResolver implements Resolve<IAppointmentsAvailable | null> {
  constructor(
    private appointmentService: AppointmentService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppointmentsAvailable | null> {
    return this.appointmentService.getAvaliableAppoinments().pipe(
      map(appointment => isProperApiValue(appointment) ? this.filterForOpenAppointments(appointment) : null)
    );
  }

  filterForOpenAppointments(appointments: IAppointmentsAvailable): IAppointmentsAvailable {
    return {
      ...appointments,
      slots: appointments.slots.filter(slot => !!slot.available)
    }
  }
}
