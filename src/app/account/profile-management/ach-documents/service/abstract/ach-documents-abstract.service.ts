import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export abstract class AchDocumentsAbstractService {
  abstract upload(files: Set<File>, vendorId: string,companyInfo: string): {
    [key: string]: { progress: Observable<number>; error: Observable<string> };
  };

  abstract buildUploadParams(vendorId: string, companyInfo: string): HttpParams;

  constructor() {}
}
