import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { AchDocuments } from '../../ach-documents/model/ach-documents.model';

@Injectable({
  providedIn: 'root'
})
export abstract class ProfileAbstractService {
  constructor() {}

  abstract getAchDocs(
    achInfoData$: BehaviorSubject<AchDocuments[]>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>
  ): void;

  abstract buildAchDocsParams(vendorId: string, companyInfo: string): HttpParams;

  abstract achDocsSuccessHandler(
    achInfoData$: BehaviorSubject<AchDocuments[]>,
    error$: Subject<boolean>,
    completion$: Subject<boolean>,
    data: any
  ): void;

  abstract achDocsErrorHandler(error$: Subject<boolean>, completion$: Subject<boolean>, error?: any): void;

}
