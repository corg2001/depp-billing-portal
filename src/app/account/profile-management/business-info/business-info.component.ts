import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/config.service';
import { environment } from 'src/environments/environment';
import { AddressBaseInterface } from 'src/app/core/interface/address.base.interface';
import { AddressInterface } from 'src/app/core/interface/address.interface';

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
  public businessAddress: AddressInterface;
  public mailingAddress: AddressInterface;
  public hwaContactName: string;
  public hwaContactPhoneNumber: string;
  public hwaContactEmail: string;
  public userName: string;
  public password: string;
  public showUserDetails: boolean = false;

  constructor(private _config: ConfigService) {}

  ngOnInit() {
    this._config.init();
    this.accountNumber = this._config.getAccountNumber();
    this.email = this._config.getEmail();
    this.taxId = this._config.getTaxId();
    this.companyname = this._config.getcompanyName();
    this.phoneNumber = this._config.getPhoneNumber();
    this.owner = this._config.getPartyName();
    this.businessAddress = this._config.getBusinessAddress();
    this.mailingAddress = this._config.getMailingAddress();
    this.hwaContactName = '';
    this.hwaContactEmail = `${environment.core.email}`;
    this.hwaContactPhoneNumber = `${environment.core.customerServiceNumber}`;
    this.userName = this._config.getUserName();
    this.password = this._config.getPassword();
  }
}
