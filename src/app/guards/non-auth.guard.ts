import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.getAdminUser().pipe(
      map(user => !user as boolean),
      catchError((err: any) => {
        if ((err as HttpErrorResponse)?.status == 401) {
          return of(true);
        }
        return throwError(() => err);
      }),
      tap(isLoggedOut => {
        if (!isLoggedOut) {
          this.router.navigate(['admin', 'dashboard'])
        }
      })
    )
  }

}
