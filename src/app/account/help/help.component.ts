import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactPayloadInterface } from 'src/app/core/interface/payload/contact.payload.interface';
import { ConfigService } from 'src/app/core/config.service';
import { AssociationRecordTypeEnum } from 'src/app/core/enums/association-record-type.enum';
import { AxPhoneNumberPayloadInterface } from 'src/app/core/interface/payload/ax-phone-number.payload.interface';
import { AxEmailPayloadInterface } from 'src/app/core/interface/payload/ax-email.payload.interface';
import { HelpAbstractService } from './service/abstract/help-abstract.service';
import { Subject, Subscription } from 'rxjs';
import { CompanyInfoPayloadInterface } from 'src/app/core/interface/payload/company-info.payload.interface';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {
  public contactInfo: ContactPayloadInterface;
  public helpFormGroup: FormGroup;
  public successMessage$: Subject<string> = new Subject<string>();
  public resultTitle: string;
  public resultDetails: string;
  public isCompleted: boolean;
  public isError: boolean;
  public successMessage: string;
  private _successMessageSubscription: Subscription = new Subscription();
  private _completionSubscription: Subscription = new Subscription();
  private _errorSubscription: Subscription = new Subscription();
  
  constructor(
    private _formBuilder: FormBuilder,
    private _configService: ConfigService,
    private _helpService: HelpAbstractService
    ) {}

  ngOnInit() {
    this._configService.init();
    this.resultTitle = 'Thank You';
    this.resultDetails = 'Thank you for your message! We will be in touch soon.';
   this.helpFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      phoneType: [''],
      zipcode: ['', Validators.required],
      state: ['', Validators.required],
      message: ['', Validators.required],
      preferredMethod: ['']
    });
  }

  public get hf(): any {
    return this.helpFormGroup.controls;
  }
  public sendHelpContent(form: FormGroup) {
    console.log('help page submit')
    // service code
    const completion$: Subject<boolean> = new Subject<boolean>();
    const error$: Subject<boolean> = new Subject<boolean>();
    const vendorId: string = this._configService.getVendorId();
    const companyInfo: CompanyInfoPayloadInterface = this._configService.getCompanyInfoObj();
    const contact: ContactPayloadInterface = this._buildContactObj(form, companyInfo, vendorId);

    this._helpService.postHelpInfo(contact, completion$, error$, this.successMessage$);
    this._completionSubscription = completion$.subscribe((completed: boolean) => this.isCompleted = completed);
    this._errorSubscription = error$.subscribe((error: boolean) => this.isError = error);
    this._successMessageSubscription = this.successMessage$.subscribe((message: string) => this.successMessage = message);
  }

  private _buildContactObj(form: FormGroup, companyInfo: CompanyInfoPayloadInterface, vendorId: string ): ContactPayloadInterface {
    const phone: AxPhoneNumberPayloadInterface = {
      value: form.controls.phoneNumber.value,
      type: form.controls.phoneType.value,
    };

    const email: AxEmailPayloadInterface = {
      value: form.controls.email.value
    };

    return {
      first_name: form.controls.firstName.value,
      last_name: form.controls.lastName.value,
      company_info: companyInfo,
      account_id: vendorId,
      account_type: AssociationRecordTypeEnum.Contractor,
      phone: phone,
      postal_code: form.controls.zipcode.value,
      state: form.controls.state.value,
      email: email,
      message: form.controls.message.value
    };
  }
  ngOnDestroy(): void {
    this._completionSubscription.unsubscribe();
    this._errorSubscription.unsubscribe();
    this._successMessageSubscription.unsubscribe();
  }
}
