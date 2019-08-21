import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AgreedRates } from '../model/agreed-rates.model';
import { AgreedRatesService } from '../agreed-rates.service';

@Component({
  selector: 'app-agreed-rates-table',
  templateUrl: './agreed-rates-table.component.html',
  styleUrls: ['./agreed-rates-table.component.scss']
})

export class AgreedRatesTableComponent implements OnInit {
  public agreedRates: AgreedRates[] = [];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];

  public agreedRatesListSubject: Subject<any> = new Subject();
  public completionSubject: Subject<boolean> = new Subject();
  public loading: boolean = true;

  constructor(private _agreedRatesService: AgreedRatesService) { }

  ngOnInit() {
    this.agreedRatesListSubject.subscribe((agreedRatesData: AgreedRates[]) => {
      this.agreedRates = agreedRatesData.slice(0, 100); // TODO: remove the slice and fix the pagination bar
      this.collectionSize = this.agreedRates.length;
      this.loading = false;
    });
    this._agreedRatesService.agreedRates$.subscribe(agreedRatesData => this.agreedRates = agreedRatesData);
    this.loading = true;
    this._agreedRatesService.getAgreedRates(this.completionSubject, this.agreedRatesListSubject);
    this.page = 1;
    this.pageSize = 15;
    this.collectionSize = 10;
  }

  public modifiedAgreedRates(): AgreedRates[] {
    return this.agreedRates.slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
}
