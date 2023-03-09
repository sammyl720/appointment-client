import { Component, Inject, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, lastValueFrom, map, Observable, switchMap, take, tap } from 'rxjs';
import { DisplayAppointmentComponent } from '../display-appointment/display-appointment.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { IAdminContent, IAppointment, ITimeSlot } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';
import { MatSort, Sort } from '@angular/material/sort';
import { DOCUMENT } from '@angular/common';

export interface AppointmentTableColumns {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  time: TIME_SLOT;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'time'];

  refreshRequests = new BehaviorSubject<boolean>(false);

  tableSortChanges = new BehaviorSubject<Sort>({
    direction: 'asc',
    active: 'time'
  });

  adminContent$: Observable<IAdminContent>;
  dataSource$: Observable<IAppointment[]>
  constructor(
    public responsiveService: ResponsiveService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.adminContent$ = this.refreshRequests.pipe(
      switchMap(() => {
        return this.authService.getAdminContent();
      })
    );

    this.dataSource$ = combineLatest([
      this.tableSortChanges,
      this.refreshRequests,
    ])
      .pipe(
        switchMap(([sortChange]) => this.adminContent$
          .pipe(
            map(content => {
              const { booked } = content;
              const appointments = booked.map(appointment => {
                return <IAppointment>{
                  ...appointment,
                  time: appointment.timeslot.time
                }
              });

              return this.sortAppointments(appointments, sortChange);
            })
          )
        )
      )
  }

  async downloadCSV() {
    const appointments = await lastValueFrom(this.dataSource$.pipe(take(1)));
    const date = new Date(appointments[0]?.date).toISOString().substring(0, 10);
    const fileName = `Blood-Drive-Appointments-${date}.csv`;
    const csvContent = this.getAppointmentsAsCSVString(appointments);
    const csvFile = new Blob([csvContent], { type: 'text/csv' });

    const link = this.document.createElement('a');
    link.download = fileName;
    link.href = this.document.defaultView!.URL.createObjectURL(csvFile);
    link.click();

    link.remove();

  }

  getAppointmentsAsCSVString(appointments: IAppointment[]) {

    let csvText = `first name, last name, email, phone, time\r\n`;
    csvText += appointments.reduce((full, current) => full + this.getCsvRow(current), '');
    return csvText.trimEnd();
  }

  getCsvRow(appointment: IAppointment) {
    const { firstName, lastName, email, phone, timeslot: { time } } = appointment;
    return `${firstName},${lastName},${email},${phone.toString()},${time}\r\n`;
  }

  sortAppointments(appointments: IAppointment[], sortInfo: Sort) {
    const { active, direction } = sortInfo;
    const isAsc = direction === 'asc';

    return appointments.sort((first, second) => {
      if (active === 'time') {
        return this.sortByTime(first, second, isAsc);
      }

      const firstValue = first[active as keyof IAppointment];
      const secondValue = second[active as keyof IAppointment];
      const isFirstGreater = firstValue! > secondValue!;
      return isFirstGreater || !isAsc ? 1 : -1;
    })
  }

  sortByTime(firstAppointment: IAppointment, secondAppointment: IAppointment, isAsc: boolean) {
    const firstTime = this.getMinuteAndHour(firstAppointment.timeslot.time)
    const secondTime = this.getMinuteAndHour(secondAppointment.timeslot.time);

    const isFirstGreater = firstTime.hour === secondTime.hour ? firstTime.minute > secondTime.minute : firstTime.hour > secondTime.hour;
    const multiplier = isAsc ? 1 : -1;
    const sortValue = isFirstGreater ? 1 : -1;
    return sortValue * multiplier;
  }

  getMinuteAndHour(time: TIME_SLOT) {
    const [hour, minute] = this.removePM(time).split(':').map(val => parseInt(val))
    return { hour, minute }
  }

  removePM(time: TIME_SLOT) {
    return time.substring(0, time.indexOf('PM'))
  }
  refresh() {
    this.refreshRequests.next(true);
  }

  logout() {
    this.authService.logout();
  }

  sortChange(sort: Sort) {
    this.tableSortChanges.next(sort);
  }
}
