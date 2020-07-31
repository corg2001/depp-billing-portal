import { CalendarEnums } from 'src/app/shared/enums/calendar.enums';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { InvoiceInterface } from '../interface/invoice.interface';
import { environment } from 'src/environments/environment';
import { InvoiceAsbstractService } from '../service/abstract/invoice.asbstract.service';
import * as moment from 'moment';
import * as dateFormat from 'dateformat';

@Component({
  selector: 'app-invoice-history',
  templateUrl: './invoice-history.component.html',
  styleUrls: ['./invoice-history.component.scss']
})
export class InvoiceHistoryComponent implements OnInit {
  public invoices$: BehaviorSubject<InvoiceInterface[]> = new BehaviorSubject([]);
  public error$: Subject<boolean> = new Subject();
  public errorMessage$: Subject<string> = new Subject();
  public completion$: Subject<boolean> = new Subject();
  public invoices: InvoiceInterface[] = [];
  public error: boolean = false;
  public completion: boolean = false;
  public loading: boolean = true;
  public isData: boolean = false;
  public noInfoText: string;
  public headerText: string;

  constructor(private _invoiceService: InvoiceAsbstractService, private _configService: ConfigService) {}

  ngOnInit(): void {
    this.init();
  }

  public init(): void {
    this.headerText = 'Open Invoice History';
    this._configService.init();
    this.noInfoText = `Invoice information is not available. Please reach out to your Territory Manager for assistance.`;
    this.getInvoice(this.invoices$, this.completion$, this.error$, this.errorMessage$);
  }

  public searchInvoices(formGroup: FormGroup): void {
    const startDate: Date = formGroup.controls.startDate.value;
    const endDate: Date = formGroup.controls.endDate.value;

    this.getInvoice(this.invoices$, this.completion$, this.error$, this.errorMessage$, startDate, endDate);
  }

  public getInvoice(
    invoices$: BehaviorSubject<InvoiceInterface[]>,
    completion$: Subject<boolean>,
    error$: Subject<boolean>,
    errormessage$: Subject<string>,
    startDate?: Date,
    endDate?: Date
  ): void {
    this._invoiceService.getInvoice(invoices$, completion$, error$, errormessage$, startDate, endDate);

    invoices$.subscribe((invoicesValue: InvoiceInterface[]) =>  {
      this.invoices = invoicesValue;
      this.isLoading();
      this.checkForData();
    });
    completion$.subscribe((completed: boolean) => {
      this.completion = completed;
    });
    error$.subscribe((errorValue: boolean) => this.error = errorValue);
  }

  public isLoading(): void {
    this.completion === true ? this.loading = false : this.loading = true;
  }

  public checkForData(): void {
    this.invoices !== null && this.completion === true ? this.isData = true : this.isData = false;
  }
}
