import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SocialMediaEnum } from '../../core/enums/social-media.enums';
import { environment } from 'src/environments/environment';

@Component({
  standalone: false,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  public socialMediaLinks = SocialMediaEnum;
  public yearToDate: string;
  public footerMessage: string;
  public termsOfUseUrl = environment.legalTerms.termsOfUse;
  public privacyPolicyUrl = environment.legalTerms.privacyPolicy;
  constructor() {}

  ngOnInit() {
    this.yearToDate = moment().format('YYYY');
    this.footerMessage = `${this.yearToDate} NRG Protects Inc. All Rights Reserved.`;
  }
}
