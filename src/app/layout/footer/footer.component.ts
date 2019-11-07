import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SocialMediaEnum } from '../../core/enums/social-media.enums';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public socialMediaLinks = SocialMediaEnum;
  public yearToDate: string;
  public footerMessage: string;
  constructor() { }

  ngOnInit() {
    this.yearToDate = moment().format('YYYY');
    this.footerMessage = `${this.yearToDate} HOME WARRANTY OF AMERICA, Inc. Home Warranty
    Information: HWA offers comphrehensive home warranty plans at a great value with easy, reliable solutions for
    unexpected problems. An HWA Home Warranty protects you from the expenses of repairs or replacements of major
    mechanical systems and appliances that break down due to normal wear and tear during the coverage term.`;

  }

}
