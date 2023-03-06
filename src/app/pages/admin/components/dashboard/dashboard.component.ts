import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { DisplayAppointmentComponent } from '../display-appointment/display-appointment.component';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ResponsiveService } from 'src/app/services/responsive/responsive.service';
import { IAdminContent, IAppointment } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';

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

    this.dataSource$ = this.refreshRequests
      .pipe(
        switchMap(() => this.adminContent$
          .pipe(
            map(content => {
              const { booked } = content;
              return booked.map(appointment => {
                return <IAppointment>{
                  ...appointment,
                  time: appointment.timeslot.time
                }
              })
            })
          )
        )
      )
  }

  showAppointmentDetails(appointment: IAppointment) {
    console.log(appointment)
    if (this.responsiveService.isMobile || this.responsiveService.isTablet) {
      this.dialog.open(DisplayAppointmentComponent, {
        data: appointment
      })
    }
  }

  refresh() {
    this.refreshRequests.next(true);
  }

  logout() {
    this.authService.logout();
  }
}
