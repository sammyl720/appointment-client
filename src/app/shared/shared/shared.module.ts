import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDetailsComponent } from 'src/app/components/event-details/event-details.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';


const imports = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  CommonModule,
  ReactiveFormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  FormsModule
]
@NgModule({
  declarations: [
    EventDetailsComponent,
  ],
  imports: [
    ...imports
  ],
  exports: [
    EventDetailsComponent,
    CommonModule,
    ...imports,
  ]
})
export class SharedModule { }
