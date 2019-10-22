import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { ContactPayloadInterface } from 'src/app/core/interface/payload/contact.payload.interface';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';
import { HttpHeadersTypeEnum, HttpHeadersValueTypeEnum } from 'src/app/shared/enums/http-headers.enums';
import { environment } from 'src/environments/environment';
import { LoggerService } from 'src/app/core/logger.service';
import { HelpAbstractService } from './abstract/help-abstract.service';

@Injectable({
  providedIn: 'root'
})
export class HelpService implements HelpAbstractService {
  constructor(private _http: HttpClient, private _logService: LoggerService) {}
  public postHelpInfo(
    contact: ContactPayloadInterface,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    successMessage$: Subject<string>
  ): void {
    const header = this._buildHttpParams(contact);
    this._http.post<string>(environment.helpUrl, contact, { headers: header }).subscribe(
      (data: string) => {
        completion$.next(true);
        error$.next(false);
        successMessage$.next(data);
      },
      (error: HttpErrorResponse) => {
        completion$.next(true);
        error$.next(true);
        this._logService.error(error.message);
      }
    );
  }

  private _buildHttpParams(contact: ContactPayloadInterface): HttpHeaders {
    return new HttpHeaders().set(
      HttpHeadersTypeEnum.Authorization,
      HttpHeadersValueTypeEnum.TextPlain
    );
  }
}
