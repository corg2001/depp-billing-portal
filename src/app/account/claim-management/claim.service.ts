import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from './model/claims.model';
import {
  JobStatus,
  ClaimOrderType,
  ClaimDisposition
} from './model/claims.enums';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {
  private _claims: Claim[] = [];
  public claims$: BehaviorSubject<Claim[]>;
  constructor() {
    this._claims = [
      new Claim(
        '23456921',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Kevin Johnson',
        JobStatus.inProgress,
        '301 Miracle Way, Phoenix AZ, 478963'
      ),
      new Claim(
        '54789979',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Lenny Joesph',
        JobStatus.needsAuth,
        '113 Gray St, Houston TX, 77379'
      ),
      new Claim(
        '89741365',
        'xx-xx-xxxxx',
        ClaimOrderType.repair,
        ClaimDisposition.recall,
        'John Doe',
        JobStatus.inProgress,
        '301 Smith St, Houston TX, 77379'
      ),
      new Claim(
        '21458742',
        'xx-xx-xxxxx',
        ClaimOrderType.surge,
        ClaimDisposition.cashout,
        'Mark Jackson',
        JobStatus.needsAuth,
        '2309 Joy St, Los Angelos CA, 21571'
      ),
      new Claim(
        '96582341',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'Mary Jane',
        JobStatus.inProgress,
        '301 Smith St, Houston TX, 77379'
      ),
      new Claim(
        '36251478',
        'xx-xx-xxxxx',
        ClaimOrderType.replace,
        ClaimDisposition.replacement,
        'John Doe',
        JobStatus.inProgress,
        '7404 Ten Curves St, Houston TX, 77379'
      ),
      new Claim(
        '2587419',
        'xx-xx-xxxxx',
        ClaimOrderType.surge,
        ClaimDisposition.cashout,
        'Lisa Willis',
        JobStatus.inProgress,
        '257 Autumn Way, Detroit MI, 33254'
      )
    ];
    this.claims$ = new BehaviorSubject(this._claims);
  }

  public search(name?: string, jobId?: string, address?: string): void {
    this.claims$.next(
      this._claims.filter((claim: Claim) => {
        const nameInput = name.toLowerCase();
        const jobIdInput = jobId.toLowerCase();
        const addressInput = address.toLowerCase();
        return name
          ? claim.name.toLowerCase().includes(nameInput)
          : jobId
          ? claim.jobId.toLowerCase().includes(jobIdInput)
          : address
          ? claim.address.toLowerCase().includes(addressInput)
          : {};
      })
    );
  }
}
