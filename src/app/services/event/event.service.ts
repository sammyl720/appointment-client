import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IEvent, IEventDetails, IEventDto } from 'src/app/types/api.types';
import { wrapError } from '../util';

export interface IMessageResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvent(): Observable<IEvent | HttpErrorResponse> {
    return wrapError(this.http.get<IEvent>(this.apiUrl));
  }

  createEvent(newEvent: IEventDto): Observable<IEvent> {
    return this.http.post<IEvent>(this.apiUrl + '/admin/event', newEvent);
  }

  addEmailToNotify(email: string) {
    return this.http.post<IMessageResponse>(this.apiUrl + '/notify', { email });
  }
}
