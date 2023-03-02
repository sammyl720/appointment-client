import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { IEvent, IEventDetails } from 'src/app/types/api.types';
import { wrapError } from '../util';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEvent(): Observable<IEvent | HttpErrorResponse> {
    return wrapError(this.http.get<IEvent>(this.apiUrl));
  }
}
