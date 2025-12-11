import { Component, OnInit, Input } from '@angular/core';
import { JobDetailInterface } from './../../interface/job-detail.interface';
import { ConfigService } from 'src/app/core/config.service';

@Component({
  standalone: false,
  selector: 'app-job-summary-card',
  templateUrl: './job-summary-card.component.html',
  styleUrls: ['./job-summary-card.component.scss']
})
export class JobSummaryCardComponent implements OnInit {
  @Input() public headerText: string;
  @Input() public jobDetail: JobDetailInterface;

  public isCollapsed: boolean = false;
  public dateFormat: string = 'M/d/yyyy';
  public contractorPhoneNumber: string;

  constructor(private _config: ConfigService ) { }

  ngOnInit() {
    this.contractorPhoneNumber = this._config.getPhoneNumber();
  }

}
