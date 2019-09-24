import {
  Component,
  OnChanges,
  ViewEncapsulation,
  OnInit,
  Input
} from '@angular/core';
import { ServiceAreasInterface } from '../interface/service-areas.interface';
import { ServiceAreaDetailsInterface } from '../interface/service-area-details.interface';
import { CountiesInterface } from '../interface/counties.interface';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-service-area-table',
  templateUrl: './service-area-table.component.html',
  styleUrls: ['./service-area-table.component.scss'],
})
export class ServiceAreaTableComponent implements OnInit, OnChanges {
  @Input() public serviceAreasDeatils$?: Subject<
    ServiceAreaDetailsInterface[]
  > = new Subject();
  @Input() searchExecuted: boolean;
  public isData: boolean = false;
  public page: number;
  public pageSize: number;
  public collectionSize: number = 0;
  public pageList: number[] = [2, 4, 6, 8];
  public serviceAreaDeatils: ServiceAreaDetailsInterface[];
  public noInfoText: string;

  constructor() {}
  ngOnInit(): void {
    this.noInfoText =
      `Service area is not part of your coverage. 
      Please reach out to your Territory Manager if you would like to expand your coverage`;

    this.page = 1;
  }
  ngOnChanges(): void {
    this.serviceAreasDeatils$.subscribe(
      (serviceAreaDetails: ServiceAreaDetailsInterface[]) => {
        this.serviceAreaDeatils = serviceAreaDetails;
        this.collectionSize = this.serviceAreaDeatils.length;
        this.pageSize = this._getPageSize(this.collectionSize);
        this.serviceAreaDeatils.length > 0
          ? (this.isData = true)
          : (this.isData = false);
      }
    );
  }

  public modifiedDetails(): ServiceAreaDetailsInterface[] {
    return this.serviceAreaDeatils.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  private _getPageSize(serviceAreaDetailsAmount: number): number {
    return serviceAreaDetailsAmount > 150 ? 20 : 10;
  }
}
