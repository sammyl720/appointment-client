import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { StorageService } from '../services/storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private storageService: StorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAdminContent().pipe(
      map(user => !user as boolean),
      catchError((err: any) => {
        if ((err as HttpErrorResponse)?.status == 401) {
          this.storageService.removeItem('_gac');
          return of(true);
        }
        return of(true);
      }),
      tap(isLoggedOut => {
        if (!isLoggedOut) {
          this.router.navigate(['admin', 'dashboard'])
        }
      })
    )
  }

}
