import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from "../services/storage/storage.service";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: StorageService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.storage.getItem('_gac');
    const reqToApi = req.url.includes(environment.apiUrl);

    if (!token || !reqToApi) return next.handle(req);
    const cloned = req.clone({
      setHeaders: { 'Authorization': `Bearer ${token}` }
    });

    return next.handle(cloned);
  }

}
