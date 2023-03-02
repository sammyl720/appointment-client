import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { IAppointment, IAppointmentsAvailable, ICreateAppointment } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';
import { environment } from '../../environments/environment';
import { wrapError } from '../util';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  apiUrl = environment.apiUrl + '/appointments';

  constructor(
    private httpClient: HttpClient
  ) { }

  getAvaliableAppoinments(): Observable<IAppointmentsAvailable | HttpErrorResponse> {
    return wrapError(this.httpClient.get<IAppointmentsAvailable>(this.apiUrl));
  }

  createAppointment(appointment: ICreateAppointment): Observable<IAppointment | HttpErrorResponse> {
    return wrapError(this.httpClient.post<IAppointment>(this.apiUrl, appointment));
  }

  getAppointment(appointmentId: string) {
    return wrapError(this.httpClient.get<IAppointment>(`${this.apiUrl}/${appointmentId}`));
  }

  updateAppointmentTime(appointmentId: string, newTime: TIME_SLOT) {
    return wrapError(this.httpClient.patch<IAppointment>(`${this.apiUrl}/${appointmentId}`, { time: newTime }));
  }

  deleteAppointment(appointmentId: string) {
    return wrapError(this.httpClient.delete(`${this.apiUrl}/${appointmentId}`));
  }
}
