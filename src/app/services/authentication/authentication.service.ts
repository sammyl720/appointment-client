import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { BehaviorSubject, catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { DashboardComponent } from 'src/app/pages/admin/components/dashboard/dashboard.component';
import { IAdminContent } from 'src/app/types/api.types';
import { environment } from 'src/environments/environment';
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
    private toastService: HotToastService,
    private route: ActivatedRoute
  ) {
    google.accounts.id.initialize({
      client_id: environment.googleClientID,
      callback: this.callback
    });
  }

  callback = async (response: any) => {
    this.httpClient.post<{ token: string }>(`${this.apiUrl}/admin/login`, response)
      .pipe(
        catchError(error => {

          if (error instanceof HttpErrorResponse && error.status == 401) {
            this.toastService.error('Invalid credentials for admin access');
          }
          else {
            this.toastService.error(error.message);
          }

          return throwError(() => error);
        })
      )
      .subscribe(value => {
        this.toastService.success("Your logged in");
        this.storageService.setItem('_gac', value.token);
        this.router.navigate(['admin', 'dashboard']);
      })
  }

  getAdminContent(): Observable<IAdminContent> {
    return this.httpClient.get<IAdminContent>(this.apiUrl + '/admin').pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse && error.status == 401) {
          this.toastService.error('Invalid credentials for admin access');
          this.storageService.removeItem('_gac');
          if (this.route.pathFromRoot.find(route => route.component instanceof DashboardComponent)) {
            this.router.navigate(['admin', 'login']);
          }
        }
        else {
          this.toastService.error(error.message);
        }

        return throwError(() => error)
      })
    )
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

  clearCache() {
    return this.httpClient.get<any>(this.apiUrl + '/admin/clearcache').pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }
}
