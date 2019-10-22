import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactPayloadInterface } from 'src/app/core/interface/payload/contact.payload.interface';

@Injectable({
  providedIn: 'root'
})
export abstract class HelpAbstractService {

  constructor() { }
  abstract  postHelpInfo(
    contact: ContactPayloadInterface,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    successMessage$: Subject<string>
  ): void;
}
