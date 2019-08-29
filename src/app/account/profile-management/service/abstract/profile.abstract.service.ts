import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AchDocuments } from '../../ach-documents/model/ach-documents.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ProfileAbstractService {
  constructor() {}

  abstract buildAchInfoParams(partyId: string, companyInfo: string): HttpParams;

  abstract achInfoSuccessHandler(
    data$: BehaviorSubject<AchDocuments[]>,
    sussesful$: Subject<boolean>,
    data: any
  ): void;

  abstract achInfoErrorHandler(sussesful$: Subject<boolean>, error: any): void;
}
