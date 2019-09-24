import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/config.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-business-info',
  templateUrl: './business-info.component.html',
  styleUrls: ['./business-info.component.scss']
})
export class BusinessInfoComponent implements OnInit {
  public accountNumber: string;
  public owner: string;
  public email: string;
  public taxId: string;
  public companyname: string;
  public phoneNumber: string;
  public additionalContactName: string;
  public additionalContactPhoneNumber: string;
  public address1: string;
  public address2: string;
  public unit: string;
  public city: string;
  public state: string;
  public postalCode: string;
  public mailingAddress1: string;
  public mailingAddress2: string;
  public mailingUnit: string;
  public mailingCity: string;
  public mailingState: string;
  public mailingPostalCode: string;
  public hwaContactName: string;
  public hwaContactPhoneNumber: string;
  public hwaContactEmail: string;
  public userName: string;
  public password: string;
  public showUserDetails: boolean  = false;

  constructor(private _config: ConfigService) { }

  ngOnInit() {
    this._config.init();
    this.accountNumber = this._config.getAccountNumber();
    this.email = this._config.getEmail();
    this.taxId = this._config.getTaxId();
    this.companyname = this._config.getcompanyName();
    this.phoneNumber = this._config.getPhoneNumber();
    this.address1 = this._config.getAddress1();
    this.address2 = this._config.getAddress2();
    this.unit = this._config.getUnit();
    this.city = this._config.getCity();
    this.state = this._config.getState();
    this.postalCode = this._config.getPostalCode();
    this.owner = this._config.getPartyName();
    this.mailingAddress1 = this._config.getAddress1();
    this.mailingAddress2 = this._config.getAddress2();
    this.mailingUnit = this._config.getUnit();
    this.mailingCity = this._config.getCity();
    this.mailingState = this._config.getState();
    this.mailingPostalCode = this._config.getPostalCode();
    this.hwaContactName = '';
    this.hwaContactEmail = `${environment.core.email}`;
    this.hwaContactPhoneNumber = `${environment.core.customerServiceNumber}`;
    this.userName = this._config.getUserName();
    this.password = this._config.getPassword();
  }

  public showOnlyLastFour(value: string): string {
    if (value) {
      return value.replace(/.(?=.{4})/g, '*');
    }
    return '';
  }

  public hidePassword(password: string): string {3
    if (password) {
      return password.replace(/.()/g, '*');
    }
    return '';
  }

}
