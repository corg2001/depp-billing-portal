import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { AgreedRates } from './model/agreed-rates.model';
import { ConfigService } from 'src/app/core/config.service';
import { LoggerService } from 'src/app/core/logger.service';

@Injectable({
  providedIn: 'root'
})
export class AgreedRatesService {
  private _agreedRates: AgreedRates[] = [];
  public agreedRates$: BehaviorSubject<AgreedRates[]>;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {
    this._agreedRates = [
      new AgreedRates(
        'A/C: Leak Detection - Electronic',
        'HVAC',
        '$150.00 per hour'
      ),
      new AgreedRates(
        'Gas Pipe - Black Iron/Steel & Flex: Replace',
        'HVAC',
        '$50.00 per hour'
      ),
      new AgreedRates(
        'Thermostat: Clean and Adjust',
        'HVAC',
        '$150.00'
      ),
      new AgreedRates(
        'Switch - Standard: Replace',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Receptacle - Standard: Replace',
        'Plumbing',
        '$150.00'
      ),
      new AgreedRates(
        'Wire/Cable: Repair Trace Short',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Capacitor: Replace',
        'Plumbing',
        '$150.00'
      ),
      new AgreedRates(
        'Hard Start Kit: Replace',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Ignitor: Replace',
        'HVAC',
        '$150.00'
      ),
      new AgreedRates(
        'Relay: Replace',
        'Plumbing',
        '$50.00'
      ),
      new AgreedRates(
        'Sequencer: Replace',
        'HVAC',
        '$150.00'
      ),
      new AgreedRates(
        'Thermocouple: Replace',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Sensor: Replace - Flame',
        'HVAC',
        '$150.00'
      ),
      new AgreedRates(
        'Switch - Interlock/Limit/Pressure: Replace',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Refrigerant - R22 Gas: Charge - Up to 2lbs',
        'HVAC',
        '$150.00'
      ),
      new AgreedRates(
        'Refrigerant - R22 Reclaimed Gas: Charge - Overcharge',
        'HVAC',
        '$50.00'
      ),
      new AgreedRates(
        'Refrigerant - R410A Gas: Charge - Up to 2lbs',
        'HVAC',
        '$150.00'
      )
    ];
    this.agreedRates$ = new BehaviorSubject(this._agreedRates);
  }

  public getAgreedRates(completion: Subject<boolean>, agreedRatesData: Subject<any>): void {
    agreedRatesData.next(this._agreedRates);
    completion.next(true);
  }

  private getAgreedRatesParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams().set('vendor_id', partyId).set('company_info', companyInfo);
  }

  public getAgreedRatesSuccessHandler(
    completion: Subject<boolean>,
    agreedRatesData: Subject<any>,
    response: Observable<HttpResponse<any>>
  ): void {
    this.loggerService.action('Successfully obtain agreedRates data');
    agreedRatesData.next(response);
    completion.next(true);
  }
  public getAgreedRatesFailureHandler(completion: Subject<boolean>, errorResponse: Observable<HttpErrorResponse>): void {
    this.loggerService.error('Unable to retrieve agreedRates data');
    completion.next(false);
  }
}
