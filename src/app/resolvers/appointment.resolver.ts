import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { AppointmentService } from '../services/appointment/appointment.service';
import { IAppointment, isProperApiValue } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class AppointmentResolver implements Resolve<IAppointment | null> {
  constructor(
    private appointmentService: AppointmentService
  ) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAppointment | null> {
    const appointmentId = route.paramMap.get('id');
    if (!appointmentId) {
      return of(null);
    }
    return this.appointmentService.getAppointment(appointmentId).pipe(
      map(appointment => isProperApiValue(appointment) ? appointment : null)
    );
  }
}
