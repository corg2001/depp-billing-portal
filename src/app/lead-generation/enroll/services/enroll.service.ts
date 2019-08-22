import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { LeadGenerationPayloadInterface } from '../interface/enroll.payload.inteface';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  constructor(private _http: HttpClient) {}

  public enroll(
    enrolled: LeadGenerationPayloadInterface,
    enrolledSubject: Subject<boolean>,
    dataSubject: Subject<any>
  ): void {
    const enrollUri: string =
      'https://unify-hwa-contractor-api-qa11.engine.host/lead-generation';
    this._http.post(enrollUri, enrolled).subscribe(
      (response: Observable<HttpResponse<any>>) => {
        dataSubject.next(response);
        enrolledSubject.next(true);
      },
      (response: Observable<HttpErrorResponse>) => {
        dataSubject.next(response);
        enrolledSubject.next(false);
      }
    );
  }
}
