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

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item: string;
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

  public profileManagementTypes = ProfileManagementTypes;

  constructor(
    private _profileService: ProfileAbstractService,
    private _configService: ConfigService,
    private _agreedRatesService: AgreedRatesAbstractService
  ) {}

  ngOnInit() {
    this._configService.init();
    this.item = this.profileManagementTypes.BusinessInfo;
    this.getachDocs();
    this.getAgreedRatesInfo();
  }

  public gotoSections(item: string) {
    this.item = item;

  }

  public getachDocs(): void {
    this._profileService.getAchDocs(this.achDocsData$, this.achDocsError$, this.achDocsCompletion$);
    this.achDocsData$.subscribe((achDocs: AchDocuments[]) => this.achDocs = achDocs);
    this.achDocsCompletion$.subscribe((succeed: boolean) => this.achDocsCompletion = succeed);
    this.achDocsError$.subscribe((error: boolean) => this.achDocsError = error);
  }

  public getAgreedRatesInfo(): void {
    this._agreedRatesService.getAgreedRates(
      this.agreedRatesData$,
      this.agreedRatesError$,
      this.agreeadRatesCompletion$,
    );

    this.agreedRatesData$.subscribe((agreedRates: AgreedRates) =>  this.agreedRates = agreedRates);
    this.agreeadRatesCompletion$.subscribe((succeed: boolean) => this.agreedRatesCompletion = succeed);
    this.agreedRatesError$.subscribe((error: boolean) => this.agreedRatesError = error);
  }

}
