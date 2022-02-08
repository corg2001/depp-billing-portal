import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { TermsOfUseComponent } from '../../auth/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from '../../auth/privacy-policy/privacy-policy.component';
import { SocialMediaEnum } from '../../core/enums/social-media.enums';
import { environment } from 'src/environments/environment';

@Component({
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
    this.footerMessage = `${this.yearToDate} Direct Energy. All rights reserved.`;
  }
}
