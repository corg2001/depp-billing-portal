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

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | null {
    const token: string = this.authService.getToken();
    const newRequest: HttpRequest<any> = req.clone({
      setHeaders: { 'Authorization': token ? token : '1a2b3c4d5e6f7h8j90lm1n2o3p4q6r7s8'}
    });
    return next.handle(newRequest);
  }
}
