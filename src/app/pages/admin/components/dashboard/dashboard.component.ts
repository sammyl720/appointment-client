import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, map, Observable, switchMap, tap } from 'rxjs';
import { DisplayAppointmentComponent } from '../display-appointment/display-appointment.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { IAdminContent, IAppointment, ITimeSlot } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';
import { MatSort, Sort } from '@angular/material/sort';

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
    private dialog: MatDialog
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
    const secondTime = this.getMinuteAndHour(firstAppointment.timeslot.time);

    const isFirstGreater = firstTime.hour === secondTime.hour ? firstTime.minute > secondTime.minute : firstTime.hour > secondTime.hour;
    return isFirstGreater || !isAsc ? 1 : -1;
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
