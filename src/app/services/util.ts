import { HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, of, throwError } from "rxjs";

export function wrapError<T>(obs: Observable<T>): Observable<T | HttpErrorResponse> {
  return obs.pipe(
    catchError((err: any) => {
      if (!(err instanceof HttpErrorResponse)) {
        throwError(() => new Error(err.message));
      }
      return of(err as HttpErrorResponse);
    })
  )
}
