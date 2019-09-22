import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-info-table',
  templateUrl: './service-info-table.component.html',
  styleUrls: ['./service-info-table.component.scss']
})
export class ServiceInfoTableComponent implements OnInit {
  @Input() set tradeDetails(tradeDetails: any[]) {
    this.tableData = _.flattenDeep(tradeDetails);
  }
  // @Input() set updatedTradeDetails(tradeDetails: any[]) {
  //   this.tableData = _.flattenDeep(tradeDetails);
  // }
  public tableData: any[];
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public showTable: boolean = false;
  public noInfoText: string;
  constructor() { }

  ngOnInit() {
    this.noInfoText = `Please contact Contractor Relations at ${environment.core.customerServiceNumber}for assistance.`;
    this.page = 1;
    this.pageSize = 6;
    this.tableData.length > 0 ? this.showTable = true : this.showTable = false;
    this.collectionSize = this.tableData.length;
  }

  public getStateCode(serviceCallDetailsList: any[]): string {
    let statCode: string;
   if (serviceCallDetailsList) {
    serviceCallDetailsList.forEach((serviceCallDetail: any) => statCode = serviceCallDetail.state_code);
    return statCode;

   }
   return '';
  }

  public getCallCount(serviceCallDetailsList: any[]): number {
    let callCount: number;
    if(serviceCallDetailsList) {
      serviceCallDetailsList.forEach((serviceCallDetail: any) => callCount = serviceCallDetail.service_call_count);
      return callCount;
    }
    return 0;
   
    
  }

  public modifiedDetails(): any[] {
    return this.tableData.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

}
