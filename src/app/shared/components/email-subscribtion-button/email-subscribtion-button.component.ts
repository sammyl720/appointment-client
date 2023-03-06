import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-subscribtion-button',
  templateUrl: './email-subscribtion-button.component.html',
  styleUrls: ['./email-subscribtion-button.component.scss']
})
export class EmailSubscribtionButtonComponent {

  @Output() onSubscribe = new EventEmitter<string>();
  emailSubForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email])
  });

  submit() {
    if (this.emailSubForm.controls.email.valid) {
      this.onSubscribe.emit(this.emailSubForm.controls.email.value as string);
    }
  }
}
