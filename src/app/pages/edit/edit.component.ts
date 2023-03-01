import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { IAppointment } from 'src/app/types/api.types';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {
  appointment$: Observable<IAppointment>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.appointment$ = this.activatedRoute.data.pipe(
      map(data => data['appointment']),
      filter(app => !!app)
    )
  }
}
