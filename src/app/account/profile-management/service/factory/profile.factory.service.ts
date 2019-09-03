import { Injectable } from '@angular/core';
import { AchDocumentsPayloadInterface } from '../../ach-documents/interface/payload/ach-documents.payload.interface';
import { AchDocuments } from '../../ach-documents/model/ach-documents.model';
import { ProfileFactoryAbstractService } from './abstract/profile.factory.abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileFactoryService implements ProfileFactoryAbstractService {
  constructor() {}

  public getAchInfoFromPayload(
    achDocumentsPayload: AchDocumentsPayloadInterface[]
  ): AchDocuments[] {
    const achDocsList: AchDocuments[] = [];
    achDocumentsPayload.forEach(
      (achDocsPayload: AchDocumentsPayloadInterface) => {
        const achDoc: AchDocuments = new AchDocuments(
          achDocsPayload.account_holder_name,
          achDocsPayload.account_number,
          achDocsPayload.account_type,
          achDocsPayload.currency,
          achDocsPayload.routing_number,
          achDocsPayload.save_details,
          achDocsPayload.wallet_reference
        );
        achDocsList.push(achDoc);
      }
    );
    return achDocsList;
  }
}
