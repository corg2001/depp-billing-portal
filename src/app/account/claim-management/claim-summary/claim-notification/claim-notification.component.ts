import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Claim } from '../../model/claims.model';
import { JobStatus } from '../../model/claims.enums';

@Component({
  selector: 'app-claim-notification',
  templateUrl: './claim-notification.component.html',
  styleUrls: ['./claim-notification.component.scss']
})
export class ClaimNotificationComponent implements OnInit {
@Input() public claimSubject$: BehaviorSubject<Claim[]> = new BehaviorSubject([]);
public wipClaims: number = 0;
  constructor() { }

  ngOnInit() {
    this.claimSubject$.subscribe((claims: Claim[]) => {
      claims.forEach((claim: Claim) => {
        if (claim.jobStatus === JobStatus.wip) {
          this.wipClaims++;
        }
      });
    });
  }

}
