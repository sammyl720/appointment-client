import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { catchError, throwError } from 'rxjs';
import { EventService } from 'src/app/services/event/event.service';
import { IEvent, IEventDto, ILocation } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';

export const THREE_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 3;
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  @Output() onCreate = new EventEmitter<IEvent>();
  minDate: Date;
  maxDate: Date;
  today = new Date();

  createEventForm = this.fb.group({
    title: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    host: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
    description: new FormControl<string>(''),
    date: new FormControl<Date>(new Date(this.today.getMilliseconds() + THREE_DAYS_IN_MS), [Validators.required]),
    startingTime: new FormControl<TIME_SLOT>('3:00PM', [Validators.pattern(/^(?<hour>\d):(?<minute>00|15|30|45)PM$/), Validators.required]),
    endingTime: new FormControl<TIME_SLOT>('9:00PM', [Validators.pattern(/^(?<hour>\d):(?<minute>00|15|30|45)PM$/), Validators.required]),
    intervalsPerHour: new FormControl<number>(4, [Validators.required, Validators.min(2), Validators.max(6)]),
    appointmentsPerInterval: new FormControl<number>(6, [Validators.required, Validators.min(2), Validators.max(6)]),
    location: this.fb.group({
      name: new FormControl<string>('', [Validators.required, Validators.minLength(5)]),
      address: new FormControl<string>('', [Validators.required, Validators.minLength(15)]),
    })
  })

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private toastService: HotToastService,
    private router: Router
  ) {
    const today = new Date();
    this.minDate = new Date();
    this.minDate.setDate(today.getDate() + 3);
    this.maxDate = new Date();
    this.maxDate.setMonth(today.getMonth() + 6);
  }

  controlIsInvalid(name: keyof IEventDto) {
    const formControl = this.createEventForm.controls[name];
    return formControl?.dirty &&
      (formControl.dirty || formControl.touched);
  }

  controlIsValidAddress(name: 'name' | 'address') {
    const formControl = this.createEventForm.controls.location.get(name);
    return formControl?.dirty &&
      (formControl.dirty || formControl.touched);
  }

  dateChange(dateEvent: MatDatepickerInputEvent<any, any>) {
    const selectedDate = new Date(dateEvent.value);
    this.createEventForm.get('date')?.setValue(selectedDate);
  }

  createEvent() {
    if (this.createEventForm.valid) {
      this.eventService.createEvent(this.createEventForm.value as IEventDto).pipe(
        catchError(err => {
          this.toastService.error(err?.message ?? err.reason);
          return throwError(() => err);
        })
      ).subscribe(event => {
        console.log(event);
        this.toastService.success(`Created new event (${event.event.title})`);
        this.onCreate.emit(event);
      })
    }
  }
}
