
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('googleBtn') googleBtn!: ElementRef<HTMLElement>;
  clientId = environment.googleClientID;
  apiEndpoint = environment.apiUrl + '/admin/login';

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngAfterViewInit() {
    this.authService.renderButton(this.googleBtn.nativeElement);
  }
}
