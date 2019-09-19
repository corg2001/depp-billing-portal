import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() set tradeDetails(tradeDetails: any[]) {
    this.tableData = _.flattenDeep(tradeDetails);
  }
  public tableData: any[];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public showTable: boolean = false;
  constructor() { }

  ngOnInit() {
    this.page = 1;
    this.pageSize = 6;
    this.tableData.length > 0 ? this.showTable = true : this.showTable = false;
    this.collectionSize = this.tableData.length;
  }

  public getStateCode(serviceCallDetailsList: any[]): string {
    let statCode: string;
    serviceCallDetailsList.forEach((serviceCallDetail: any) => statCode = serviceCallDetail.state_code);
    return statCode;
  }

  public getCallCount(serviceCallDetailsList: any[]): number {
    let callCount: number;
    serviceCallDetailsList.forEach((serviceCallDetail: any) => callCount = serviceCallDetail.service_call_count);
    return callCount;
  }

  public modifiedDetails(): any[] {
    return this.tableData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

}
