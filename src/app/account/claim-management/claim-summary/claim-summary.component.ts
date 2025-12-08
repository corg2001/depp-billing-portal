import { Component, OnInit } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Claim } from '../model/claims.model';
import { ClaimPayloadInterface } from '../interface/claim.payload.interface';
import { ClaimServiceAbstract } from '../service/abstract/claim.abstract.service';
import { ClaimFactoryServiceAbstract } from '../service/factory/claim.factory.abstract.service';
import * as moment from 'moment-timezone';
import { ConfigService } from 'src/app/core/config.service';
import { SessionKeys } from 'src/app/shared/enums/session-keys.emums';
import { Router, RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { JobStatus } from '../model/claims.enums';
import { FormGroup } from '@angular/forms';
import { SearchFormValues } from 'src/app/shared/models/search-form-values.interface';

@Component({
  selector: 'app-claim-summary',
  templateUrl: './claim-summary.component.html',
  styleUrls: ['./claim-summary.component.scss']
})
export class ClaimSummaryComponent implements OnInit {
  public searchedClaim$?: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public claimList$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
  public completion$: Subject<boolean> = new Subject();
  public error$: Subject<boolean> = new Subject();
  public claims: Claim[] = [];
  public subTitleText1: string = 'My Recent Activity';
  public subTitleText2: string = 'View your claims below';
  public lastLoginDate: string;
  public partyName: string;
  public isCompleted: boolean;
  public claimsFound: boolean;
  public loading: boolean = true;
  public searchFormValues: SearchFormValues;
  constructor(
    private claimService: ClaimServiceAbstract,
    private _claimFactoryService: ClaimFactoryServiceAbstract,
    private _configService: ConfigService,
    private _router: Router
  ) {
    this._router.events.subscribe((e: RouterEvent) => {
      this._navigationInterceptor(e);
    });
  }

  public ngOnInit() {
    this.initSearchedValues();
    this.getClaims(this.claimList$, this.error$, this.completion$)
    this.completion$.subscribe((completed: boolean) => {
      this.isCompleted = completed;
    });
    localStorage.getItem(SessionKeys.last_login) !== undefined
      && localStorage.getItem(SessionKeys.last_login) !== '' ?
      this.lastLoginDate = `Last Login: ${moment(localStorage.getItem(SessionKeys.last_login))
        .tz('America/Chicago')
        .format('LLLL')} CST` : this.lastLoginDate = '';
  }

  public initSearchedValues(): void {
    this.searchFormValues = {
      startDate: this.claimService.getStartDate(),
      endDate: this.claimService.getEndDate()
    };
  }


  public getClaims(claimList$: BehaviorSubject<Claim[]>, error$: Subject<boolean>,
    completion$: Subject<boolean>, startDate?: string, endDate?: string): void {
    // getClaims called
    this.loading = true;
    const claimPayload$: BehaviorSubject<
      ClaimPayloadInterface[]
    > = new BehaviorSubject([]);
    this.partyName = this._configService.getPartyName();
    // party name retrieved
    this.claimService.getClaims(
      completion$,
      error$,
      claimPayload$,
      startDate,
      endDate
    );
    claimPayload$.subscribe(
      (claimPlayod: ClaimPayloadInterface[]) => {
        // claims payload received
        this.loading = false;
        this.claims = this._claimFactoryService.getClaimFromPayload(
          claimPlayod
        );
        // processed claims
        const filteredClaims = this.claims.filter(c => c.jobStatus !== JobStatus.invoiced && c.claimType !== 'Surge');
        // filtered claims
        claimList$.next(filteredClaims);
        this.claimsFound = this.claims.length > 0 ? true : false;
        // claims found
      }
    );
  }

  public search(form: FormGroup): void {
    this.completion$.next(false);
    const startDate: string = form.controls.startDate.value;
    const endDate: string = form.controls.endDate.value;
    // this.getClaims(this.searchedClaim$, this.error$, this.completion$, startDate, endDate);
    this.getClaims(this.claimList$, this.error$, this.completion$, startDate, endDate);
    this.getClaims(this.searchedClaim$, this.error$, this.completion$, startDate, endDate);
    this.searchFormValues = {
      address: null,
      endDate: form.controls.endDate.value,
      jobId: null,
      name: null,
      startDate: form.controls.startDate.value,
      type: null
    };
  }

  public filter(form: FormGroup): void {
    this.completion$.next(false);
    this.searchFormValues = {
      address: form.controls.address.value,
      endDate: form.controls.endDate.value,
      jobId: form.controls.jobId.value,
      name: form.controls.name.value,
      startDate: form.controls.startDate.value,
      type: form.controls.type.value
    };
    form.controls.name.value ||
      form.controls.jobId.value ||
      form.controls.address.value ||
      form.controls.type.value
      ? this.searchedClaim$.next(this.claimService.filter(
        this.claimList$.getValue(),
        form.controls.name.value,
        form.controls.jobId.value,
        form.controls.address.value,
        form.controls.type.value,
        form.controls.startDate.value,
        form.controls.endDate.value
      ))
      : this.searchedClaim$.next(this.claimList$.getValue());
    this.completion$.next(true);
  }

  private _navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
