import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TokenHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
    const date: Date =  new Date();
    console.log(`IMPORTANT: http interceptor has been provided! at ${date}`);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = this.authService.getToken();
    const newRequest: HttpRequest<any> = req.clone({
      setHeaders: { 'Authorization': token }
    });
    return next.handle(newRequest);
  }
}
