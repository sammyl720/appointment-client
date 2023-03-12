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
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';


const imports = [
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatSelectModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatExpansionModule,
  CommonModule,
  ReactiveFormsModule,
  MatNativeDateModule,
  MatDialogModule,
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
