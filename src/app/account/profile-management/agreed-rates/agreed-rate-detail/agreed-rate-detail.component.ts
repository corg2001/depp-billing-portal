import { Component, OnInit, Input } from '@angular/core';
import { RateDetailsInterface } from '../interface/rate-details.interface';
import { ConfigService } from 'src/app/core/config.service';

@Component({
  selector: 'app-agreed-rate-detail',
  templateUrl: './agreed-rate-detail.component.html',
  styleUrls: ['./agreed-rate-detail.component.scss']
})
export class AgreedRateDetailComponent implements OnInit {
  @Input() public rateDetails?: RateDetailsInterface[];
  public partyId: string;

  constructor(private _configService: ConfigService) { }

  ngOnInit() {
    this.partyId = this._configService.getPartyId();
  }

}
