import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { ICognitoLoginResponse, ICognitoLoginPayload } from '../shared/models/interface/cognito.interface';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  public constructor(private _http: HttpClient) { }

  public login(data: { password: string, username: string }): Observable<ICognitoLoginResponse> {
    const url: string = environment.cognito.loginURL;
    const body: ICognitoLoginPayload = {
      AuthParameters: {
        USERNAME: data.username,
        PASSWORD: data.password,
      },
      AuthFlow: environment.cognito.authFlow,
      ClientId: environment.cognito.clientId,
    };
    const headers: HttpHeaders = new HttpHeaders().set(
      'content-type', 'application/x-amz-json-1.1').set('X-Amz-Target', 'AWSCognitoIdentityProviderService.InitiateAuth');
    return this._http.post<ICognitoLoginResponse>(url, JSON.stringify(body), { headers })
  }
}
