import { Injectable } from '@angular/core';
import { HttpRequest, HttpParams, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';


@Injectable({
  providedIn: 'root'
})

export class AchDocumetsService {

  constructor(private _http: HttpClient) { }

  public upload(files: Set<File>, vendorId: string, companyInfo: string): { [key: string]: {progress: Observable<number>} } {
    const status: { [key: string]: {progress: Observable<number>} } = {};

    files.forEach((file: File) => {
      const formData: FormData = new FormData();
      const  params: HttpParams = this.buildUploadParams(vendorId, companyInfo);
      formData.append('file', file, file.name);
      // http-post request to pass the form to get the upload progress
      const req = new HttpRequest('POST', `${environment.uploadUrl}`, formData, { reportProgress: true, params: params});
      const progress$ = new Subject<number>();
      // send the http-requesr and subscribe for progress-updates
      this._http.request(req).subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // calculate the progress percentage 
          const percentDone = Math.round(100 * event.loaded / event.total);
          console.log(percentDone)
          // pass the percentage into the progess stream
          progress$.next(percentDone);
        } else if (event instanceof HttpResponse) {
          // close the progress-stream if we get an answer from the API
          // The upload is compolete
          progress$.complete();
        }
      });
      // save every progress-observable in a map of all observables
      status[file.name] = { progress: progress$.asObservable() };
    });

    // return the map of progress.observables
    return status;
  }

  public buildUploadParams(vendorId: string, companyInfo: string): HttpParams {
    return new HttpParams().set(HttpParamEnum.vendorId, vendorId)
    .set(HttpParamEnum.companyInfo, companyInfo);
  }
}
