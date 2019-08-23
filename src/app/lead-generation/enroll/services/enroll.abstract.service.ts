import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LeadGenerationPayloadInterface } from '../interface/enroll.payload.inteface';

@Injectable({
  providedIn: 'root'
})
export abstract class EnrollAbstractService {

  constructor() { }

  public abstract enroll(enrolled: LeadGenerationPayloadInterface, enrolledSubject: Subject<boolean>, dataSubject: Subject<any>): void;
}
