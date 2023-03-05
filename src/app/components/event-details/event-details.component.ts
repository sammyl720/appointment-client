import { Component, Input } from '@angular/core';
import { IEventDetails } from 'src/app/types/api.types';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent {
  @Input() event!: IEventDetails;
}
