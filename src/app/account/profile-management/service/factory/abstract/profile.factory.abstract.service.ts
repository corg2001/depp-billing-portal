import { Injectable } from '@angular/core';
import { AchDocumentsPayloadInterface } from '../../../ach-documents/interface/payload/ach-documents.payload.interface';
import { AchDocuments } from '../../../ach-documents/model/ach-documents.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class ProfileFactoryAbstractService {

  constructor() { }

  abstract getAchInfoFromPayload(
    achDocumentsPayload: AchDocumentsPayloadInterface[]
  ): AchDocuments[];
}
