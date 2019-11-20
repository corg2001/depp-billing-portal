import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { environment } from '../../environments/environment'

@Component({
  selector: 'app-maintenance-page',
  templateUrl: './maintenance-page.component.html',
  styleUrls: ['./maintenance-page.component.scss'],
})
export class MaintenancePageComponent
  implements OnInit {
  public brand: string;
  public layoutLoaded: boolean;
  public endDate: string;
  public title: string;
  public firstSentence: string;
  public secondSentence: string;
  public thirdSentence: string;
  public email: string;
  public endDateMonth: string;
  public endDateDay: string;
  public endDateYear: string;
  constructor() { }

  public ngOnInit(): void {
    this.title = environment.core.maintenance.title;
    this.email = environment.core.maintenance.email;
    this.endDateMonth = environment.core.maintenance.endDateMonth;
    this.endDateDay = environment.core.maintenance.endDateDay;
    this.endDateYear = environment.core.maintenance.endDateYear;
    this.endDate = this._setDueDate(
      this.endDateMonth,
      this.endDateDay,
      this.endDateYear
    );
    this.firstSentence = environment.core.maintenance.firstSentence;
    this.secondSentence = environment.core.maintenance.secondSentence;
    this.thirdSentence = environment.core.maintenance.thirdSentence;
    this.brand = environment.core.brandId.toLowerCase();
  }

  private _setDueDate(month: string, day: string, year: string): string {
    const dateString: string = `${month} ${day}, ${year}`;

    return month && day && year
      ? moment(new Date(dateString)).format('dddd, MMMM Do YYYY')
      : 'soon';
  }
}
