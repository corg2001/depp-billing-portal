import { Component, OnInit } from '@angular/core';

import { ProfileManagementTypes } from './../interface/profile-management-enum';
import { ProfileService } from '../service/profile.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { AchDocuments } from '../ach-documents/model/ach-documents.model';
import { AgreedRatesAbstractService } from '../agreed-rates/service/abstract/agreed-rates.abstract.service';
import { ProfileAbstractService } from '../service/abstract/profile.abstract.service';
import { AgreedRates } from '../agreed-rates/model/agreed-rates.model';
import { AgreedRatesInterface } from '../agreed-rates/interface/agreed-rates.interface';
import { ServiceAreasAbstractService } from '../service-areas/service/abstract/service-areas-abstract.service';
import { ServiceAreas } from '../service-areas/model/service-areas.model';
import { ServiceAreasInterface } from '../service-areas/interface/service-areas.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item: string;
  public name: string;
  public achDocsData$: BehaviorSubject<AchDocuments[]> = new BehaviorSubject(
    []
  );
  public achDocsError$: Subject<boolean> = new Subject();
  public achDocsCompletion$: Subject<boolean> = new Subject();
  public achDocsError: boolean;
  public achDocsCompletion: boolean;
  public achDocs: AchDocuments[] = [];

  public agreedRatesData$: Subject<AgreedRates> = new Subject();
  public agreeadRatesCompletion$: Subject<boolean> = new Subject();
  public agreedRatesError$: Subject<boolean> = new Subject();
  public agreedRates: AgreedRatesInterface;
  public agreedRatesCompletion: boolean;
  public agreedRatesError: boolean;

  public serviceAreas$: Subject<ServiceAreasInterface[]> = new Subject();
  public serviceAreasCompletion$: Subject<boolean> = new Subject();
  public serviceAreasError$: Subject<boolean> = new Subject();
  public serviceAreasErrorMessage$: Subject<string> = new Subject();
  public serviceAreas: ServiceAreas[] = [];
  public serviceAreasError: boolean;
  public serviceAreasErrorMessage: string;
  public serviceAreasCompletion: boolean;
  public profileManagementTypes = ProfileManagementTypes;

  constructor(
    private _profileService: ProfileAbstractService,
    private _configService: ConfigService,
    private _agreedRatesService: AgreedRatesAbstractService,
    private _serviceAreasService: ServiceAreasAbstractService
  ) {}

  ngOnInit() {
    this._configService.init();
    this.name = this._configService.getPartyName();
    this.item = this.profileManagementTypes.BusinessInfo;
    //this.getachDocs();
   // this.getAgreedRatesInfo();
    // this.getServiceAreas(
    //   this.serviceAreas$,
    //   this.serviceAreasCompletion$,
    //   this.serviceAreasError$,
    //   this.serviceAreasErrorMessage$
    // );
  }

  public gotoSections(item: string) {
    this.item = item;
  }

  public getachDocs(): void {
    this._profileService.getAchDocs(
      this.achDocsData$,
      this.achDocsError$,
      this.achDocsCompletion$
    );
    this.achDocsData$.subscribe(
      (achDocs: AchDocuments[]) => (this.achDocs = achDocs)
    );
    this.achDocsCompletion$.subscribe(
      (succeed: boolean) => (this.achDocsCompletion = succeed)
    );
    this.achDocsError$.subscribe(
      (error: boolean) => (this.achDocsError = error)
    );
  }

  public getAgreedRatesInfo(): void {
    this._agreedRatesService.getAgreedRates(
      this.agreedRatesData$,
      this.agreedRatesError$,
      this.agreeadRatesCompletion$
    );

    this.agreedRatesData$.subscribe(
      (agreedRates: AgreedRates) => this.agreedRates = agreedRates);
    this.agreeadRatesCompletion$.subscribe((succeed: boolean) => this.agreedRatesCompletion = succeed);
    this.agreedRatesError$.subscribe(
      (error: boolean) => (this.agreedRatesError = error)
    );
  }

  public getServiceAreas(
    servicesAreas$: Subject<ServiceAreasInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errorMessage$: Subject<string>
  ): void {
    this._serviceAreasService.getServiceAreas(
      servicesAreas$,
      completion$,
      error$,
      errorMessage$
    );
    servicesAreas$.subscribe((serviceAreas: ServiceAreas[]) => this.serviceAreas = serviceAreas);
    completion$.subscribe((completed: boolean) => this.serviceAreasCompletion = completed);
    error$.subscribe((error: boolean) => this.serviceAreasError = error);
    errorMessage$.subscribe((errorMessage: string) => this.serviceAreasErrorMessage = errorMessage);
  }
}
