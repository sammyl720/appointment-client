import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { IAppointmentSlotAvailable } from 'src/app/types/api.types';
import { TIME_SLOT } from 'src/app/types/fields';

export interface RescheduleData {
  available: IAppointmentSlotAvailable[];
  current: TIME_SLOT
}

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.scss']
})
export class EditAppointmentComponent {

  selectedValue: TIME_SLOT | null = this.data.current;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: RescheduleData
  ) {
  }
  get shouldDisable() {
    return !this.selectedValue || this.selectedValue == this.data.current;
  }

  onTimeUpdate(change: MatSelectChange) {
    this.selectedValue = change.value as TIME_SLOT;
  }
}
