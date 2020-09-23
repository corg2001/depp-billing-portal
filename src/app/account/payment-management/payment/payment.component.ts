import { Component, OnInit, OnChanges } from '@angular/core';
import { ConfigService } from 'src/app/core/config.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { PaymentHistoryInterface } from '../interface/payment-history.interface';
import { environment } from 'src/environments/environment';
import { PaymentAbstractService } from '../service/abstract/payment.abstract.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnChanges {
  public headerText: string;
  public paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  public updatedPaymentHistory$: BehaviorSubject<PaymentHistoryInterface[]> = new BehaviorSubject([]);
  public completion$: Subject<boolean> = new Subject();
  public error$: Subject<boolean> = new Subject();
  public errorMessages$: Subject<string> = new Subject();
  public historyMessage: string;

  public paymentHistory: PaymentHistoryInterface[];
  public completion: boolean = false;
  public error: boolean = false;
  public isData: boolean = false;
  public loading: boolean = true;
  public noInfoText: string;
  constructor(
    private _configService: ConfigService,
    private _paymentService: PaymentAbstractService
  ) { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges(): void {
    this.isLoading();
  }
  public init(): void {
    this.headerText = 'Payment History';
    this._configService.init();
    // tslint:disable-next-line: max-line-length
    this.getPaymentHistory(this.paymentHistory$, this.completion$, this.error$, this.errorMessages$);
  }

  public getPaymentHistory(paymentHistory$: BehaviorSubject<PaymentHistoryInterface[]>,
    completion$: Subject<boolean>, error$: Subject<boolean>, errorMessage$?: Subject<string>): void {
    this._paymentService.getPaymentHistory(
      paymentHistory$,
      completion$,
      error$,
      errorMessage$
    );

    paymentHistory$.subscribe(
      (paymentHistory: PaymentHistoryInterface[]) => {
        this.paymentHistory = paymentHistory;
        this.isLoading();
        this.checkIsData();
      }
    );

    completion$.subscribe((completion: boolean) => {
      this.completion = completion;
    });

    error$.subscribe((error: boolean) => {
      this.error = error;
    });
  }

  public isLoading(): void {
    this.completion === true ? (this.loading = false) : (this.loading = true);
  }

  public checkIsData() {
    if (this.paymentHistory) {
      this.paymentHistory.length > 0 && this.completion === true
        ? (this.isData = true)
        : (this.isData = false);
    }
  }

  public search(data: {startDate: string, endDate: string}): void {
    const minDate = data.startDate;
    const maxDate = data.endDate;
    this.updatedPaymentHistory$.next(this._paymentService.search(this.paymentHistory, minDate, maxDate));
  }
}
