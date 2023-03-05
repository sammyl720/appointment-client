import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, catchError, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from '../storage/storage.service';
interface InitConfig {
  client_id: string;
  callback?: (response: any) => void;
  login_uri?: string;
  ux_mode?: string;
}

interface ButtonConfig {
  theme: string,
  size: string;
}

declare var google: {
  accounts: {
    id: {
      initialize: (config: InitConfig) => void;
      renderButton: (element: HTMLElement, options?: ButtonConfig) => void;
      prompt: () => void;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  clientId = environment.googleClientID;
  apiUrl = environment.apiUrl;
  state$ = new BehaviorSubject<any>(null);
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private toastService: HotToastService
  ) {
    google.accounts.id.initialize({
      client_id: environment.googleClientID,
      callback: this.callback
    });
  }

  callback = async (response: any) => {
    this.httpClient.post<{ token: string }>(`${this.apiUrl}/admin/login`, response).subscribe(value => {
      this.toastService.success("Your logged in");
      this.storageService.setItem('_gac', value.token);
      this.router.navigate(['admin', 'dashboard']);
    })
  }

  getAdminUser() {
    return this.httpClient.get(this.apiUrl + '/admin');
  }

  renderButton(button: HTMLElement) {
    google.accounts.id.renderButton(button, {
      theme: 'outline',
      size: 'large'
    })
  }

  logout() {
    this.storageService.removeItem('_gac');
    this.toastService.show('Logged out');
    this.router.navigate(['admin', 'login']);
  }
}
