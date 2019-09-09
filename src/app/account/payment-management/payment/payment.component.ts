import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/core/config.service';
import { PaymentService } from '../service/payment.service';
import { Subject } from 'rxjs';
import { PaymentHistoryInterface } from '../interface/payment-history.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  public headerText: string = 'Payment History';
  public paymentHistory$: Subject<PaymentHistoryInterface[]> = new Subject();
  public completion$: Subject<boolean> = new Subject();
  public error$: Subject<boolean> = new Subject();
  public errorMessages$: Subject<string> = new Subject();

  public paymentHistory: PaymentHistoryInterface[];
  public completion: boolean;
  public error: boolean;
  public isData: boolean;
  public loading: boolean = true;
  public noInfoText: string;
  constructor(
    private _configService: ConfigService,
    private _paymentService: PaymentService
  ) {}

  ngOnInit() {
    this.init();
  }

  public init(): void {
    this._configService.init();
    // tslint:disable-next-line: max-line-length
    this.noInfoText = `Your Payment History is not set up. Please reach out to contractor relastions at ${environment.core.customerServiceNumber}.`;
    this.getPaymentHistory();
  }

  public getPaymentHistory(): void {
    this._paymentService.getPaymentHistory(
      this.paymentHistory$,
      this.completion$,
      this.error$,
      this.errorMessages$
    );

    this.paymentHistory$.subscribe(
      (paymentHistory: PaymentHistoryInterface[]) => {
        this.paymentHistory = paymentHistory;
        this.checkIsData();
      }
    );
    this.completion$.subscribe((completion: boolean) => {
      this.completion = completion;
      this.isLoading();
    });
    this.error$.subscribe((error: boolean) => {
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
}
