import { Component, EventEmitter, Input, Output, QueryList, SimpleChange, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter, map, startWith } from 'rxjs';
import { ResponsiveService, ResponsiveState } from 'src/app/services/responsive/responsive.service';
import { IAppointment } from 'src/app/types/api.types';
import { DisplayAppointmentComponent } from '../display-appointment/display-appointment.component';

@Component({
  selector: 'app-appointments-table',
  templateUrl: './appointments-table.component.html',
  styleUrls: ['./appointments-table.component.scss']
})
export class AppointmentsTableComponent {
  @Input() dataSource: IAppointment[] = [];
  @Input() responsiveState!: ResponsiveState;

  @Output() onSortChange = new EventEmitter<Sort>()
  @ViewChild(MatSort) sort!: MatSort;

  tableSource: MatTableDataSource<IAppointment>;

  displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'time'];

  constructor(
    private responsiveService: ResponsiveService,
    private dialog: MatDialog
  ) {
    console.log(this.dataSource);
    this.tableSource = new MatTableDataSource(this.dataSource);
  }

  ngAfterViewInit() {
    if (!!this.sort) {
      this.tableSource.sort ??= this.sort;
    }
  }

  sortChange(data: Sort) {
    this.tableSource.sort = this.sort;
    console.log(data);
    this.onSortChange.next(data);
  }

  showAppointmentDetails(appointment: IAppointment) {
    console.log(appointment)
    if (this.responsiveService.isMobile || this.responsiveService.isTablet) {
      this.dialog.open(DisplayAppointmentComponent, {
        data: appointment
      })
    }
  }
}
