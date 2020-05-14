import { Component, OnInit, Input } from '@angular/core';
import { JobDetailInterface } from './../../interface/job-detail.interface';

@Component({
  selector: 'app-job-summary-card',
  templateUrl: './job-summary-card.component.html',
  styleUrls: ['./job-summary-card.component.scss']
})
export class JobSummaryCardComponent implements OnInit {
  @Input() public headerText: string;
  @Input() public jobDetail: JobDetailInterface;

  public isCollapsed: boolean = false;
  public dateFormat: string = 'M/d/yyyy';

  constructor(
  ) { }

  ngOnInit() {
  }

}
