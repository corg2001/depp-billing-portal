import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenHttpInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
    const date: Date = new Date();
    console.log(`IMPORTANT: http interceptor has been provided! at ${date}`);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | null {
    const token: string = this.authService.getToken();

    const newRequest: HttpRequest<any> = req.clone({
      setHeaders: { 'Authorization': token ? token : '1a2b3c4d5e6f7h8j90lm1n2o3p4q6r7s8' }
    });

    if (newRequest.url.toLowerCase().indexOf('customerapis') > -1) {
      const newAuthReq1: HttpRequest<any> = newRequest.clone({
        setHeaders: { 'Authorization': token ? 'Bearer ' + token : '1a2b3c4d5e6f7h8j90lm1n2o3p4q6r7s8', "Ocp-Apim-Subscription-Key": environment.subscriptionkeys.customerapis },
      });
      return next.handle(newAuthReq1);
    }

    if (newRequest.url.toLowerCase().indexOf('vendorapis') > -1) {
      const newAuthReq3: HttpRequest<any> = newRequest.clone({
        setHeaders: { 'Authorization': token ? 'Bearer ' + token : '1a2b3c4d5e6f7h8j90lm1n2o3p4q6r7s8', "Ocp-Apim-Subscription-Key": environment.subscriptionkeys.vendorapis },
      });
      return next.handle(newAuthReq3);
    }

    if (newRequest.url.toLowerCase().indexOf('unauthenrollmentapis') > -1) {
      const newAuthReq2: HttpRequest<any> = newRequest.clone({
        setHeaders: { 'Authorization': token ? 'Bearer ' + token : '1a2b3c4d5e6f7h8j90lm1n2o3p4q6r7s8', "Ocp-Apim-Subscription-Key": environment.subscriptionkeys.unauthenrollmentapis },
      });
      return next.handle(newAuthReq2);
    }

    if (req.url.includes('reset-password') || req.url.includes('forgot-password')) {
      let newHeaders = req.headers.delete('Authorization');
      const apiReq = req.clone({ headers: newHeaders });
      return next.handle(apiReq);
    }

    return next.handle(newRequest);
  }
}
