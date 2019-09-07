import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Invoice } from './model/invoice.model';

import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { ConfigService } from '../../core/config.service';
import { LoggerService } from '../../core/logger.service';
import { HttpParamEnum } from 'src/app/shared/enums/http-params.enums';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private _invoice: Invoice[] = [];
  public invoice$: BehaviorSubject<Invoice[]>;
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private loggerService: LoggerService
  ) {
    this._invoice = [
      new Invoice(
        '1111111',
        '04-22-2019',
        'Tia Smith',
        '101 Main street, Houston, TX, 77002',
        '233242',
        '04-23-2019',
        '$5,521.00'
      ),
      new Invoice(
        '2222222',
        '04-28-2019',
        'Jennifer Lo',
        '113 Gray St, Houston TX, 77379',
        '234243',
        '04-29-2019',
        '$5,521.00'
      ),
      new Invoice(
        '3333333',
        '04-23-2019',
        'Jaima Fla',
        '2309 Joy St, Los Angelos CA, 21571',
        '546466',
        '04-24-2019',
        '$250.00'
      ),
      new Invoice(
        '2145874',
        '05-22-2019',
        'Tunia huil',
        '301 Smith St, Houston TX, 77379',
        '654777',
        '05-23-2019',
        '$1,250.00'
      ),
      new Invoice(
        '9658234',
        '06-08-2019',
        'Mary Jane',
        '7404 Ten Curves St, Houston TX, 77379',
        '544555',
        '06-10-2019',
        '$300.00'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Yulo Tuom',
        '101 Main street, Houston, TX, 77009',
        '888666',
        '03-15-2019',
        '$6,900.00'
      ),
      new Invoice(
        '7777777',
        '03-15-2019',
        'Tom John',
        '112 Main street, Houston, TX, 77002',
        '875826',
        '04-15-2019',
        '$900.00'
      ),
      new Invoice(
        '8888888',
        '02-15-2019',
        'Topias Kantola',
        '257 Autumn Way, Detroit MI, 33254',
        '888666',
        '03-15-2019',
        '$4,250.00'
      ),
      new Invoice(
        '9999999',
        '02-15-2019',
        'Addilynn Dodge',
        '7404 Ten Curves St, Houston TX, 77379',
        '888666',
        '03-15-2019',
        '$3,500.00'
      ),
      new Invoice(
        '7546231',
        '02-15-2019',
        'Larry Lin',
        '301 Smith St, Houston TX, 77379',
        '888666',
        '03-15-2019',
        '$8,650.00'
      ),
      new Invoice(
        '5425861',
        '02-15-2019',
        'Mia Denys',
        '2309 Joy St, Los Angelos CA, 21571',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Heath Atwood',
        '101 Main street, Houston, TX, 77002',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Case Wolf',
        '101 Main street, Houston, TX, 77002',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Lucy Bond',
        '301 Smith St, Houston TX, 77379',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Micheal Murphy',
        '301 Miracle Way, Phoenix AZ, 47896',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Ava Wright',
        '2309 Joy St, Los Angelos CA, 21571',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Emeline Duarte',
        '7404 Ten Curves St, Houston TX, 77379',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Aaron Nunez',
        '257 Autumn Way, Detroit MI, 33254',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '6666666',
        '02-15-2019',
        'Jennifer Fritz',
        '113 Gray St, Houston TX, 77379',
        '888666',
        '03-15-2019',
        '$6,900'
      ),
      new Invoice(
        '2587419',
        '05-20-2019',
        'Dianna Smiley',
        '301 Miracle Way, Phoenix AZ, 47896',
        '123123',
        '06-22-2019',
        '$1,500.00'
      )
    ];
    this.invoice$ = new BehaviorSubject(this._invoice);
  }

  public getInvoice(completion: Subject<boolean>, invoiceData: Subject<any>): void {
    invoiceData.next(this._invoice);
    completion.next(true);
  }

  private getInvoiceParams(partyId: string, companyInfo: string): HttpParams {
    return new HttpParams().set(HttpParamEnum.vendorId, partyId).set(HttpParamEnum.companyInfo, companyInfo);
  }

  public getInvoiceSuccessHandler(
    completion: Subject<boolean>,
    invoiceData: Subject<any>,
    response: Observable<HttpResponse<any>>
  ): void {
    this.loggerService.action('Successfully obtain invoice data');
    invoiceData.next(response);
    completion.next(true);
  }
  public getInvoiceFailureHandler(completion: Subject<boolean>, errorResponse: Observable<HttpErrorResponse>): void {
    this.loggerService.error('Unable to retrieve invoice data');
    completion.next(false);
  }

  public search(claimDate?: string, invoiceDate?: string, serviceAddress?: string): void {
    this.invoice$.next(
      this._invoice.filter((invoice: Invoice) => {
        const addressInput = serviceAddress.toLowerCase();
        return claimDate
          ? invoice.claimDate.includes(claimDate)
          : invoiceDate
            ? invoice.invoiceDate.includes(invoiceDate)
            : serviceAddress
              ? invoice.serviceAddress.toLowerCase().includes(addressInput)
              : {};
      })
    );
  }
}
