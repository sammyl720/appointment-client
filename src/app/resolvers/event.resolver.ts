import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { EventService } from '../services/event/event.service';
import { IEvent, isProperApiValue } from '../types/api.types';

@Injectable({
  providedIn: 'root'
})
export class EventResolver implements Resolve<IEvent | null> {
  constructor(private eventService: EventService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEvent | null> {
    return this.eventService.getEvent().pipe(
      map(eventDetails => isProperApiValue(eventDetails) ? eventDetails : null)
    );
  }
}
