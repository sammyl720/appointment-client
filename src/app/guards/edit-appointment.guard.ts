import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppointmentService } from '../services/appointment/appointment.service';
import { isProperApiValue } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class EditAppointmentGuard implements CanActivate {

  constructor(
    private appointmentService: AppointmentService,
    private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const appointmentId = route.paramMap.get('id');
    if (typeof appointmentId != 'string') return false;
    return this.appointmentService.getAppointment(
      appointmentId
    ).pipe(
      map(appointment => {
        const canActivate = isProperApiValue(appointment);
        if (canActivate) {
          return true;
        }
        this.router.navigate(['/'])
        return false;
      })
    )
  }

}
