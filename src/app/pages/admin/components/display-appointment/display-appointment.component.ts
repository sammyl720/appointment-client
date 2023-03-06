import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAppointment } from 'src/app/types/api.types';

@Component({
  selector: 'app-display-appointment',
  templateUrl: './display-appointment.component.html',
  styleUrls: ['./display-appointment.component.scss']
})
export class DisplayAppointmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAppointment
  ) {

  }
}
