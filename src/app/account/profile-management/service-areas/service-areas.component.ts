import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceAreasInterface } from './interface/service-areas.interface';
import { ServiceAreasAbstractService } from './service/abstract/service-areas-abstract.service';
import { ServiceAreas } from './model/service-areas.model';
import { ServiceAreaDetailsInterface } from './interface/service-area-details.interface';
import { environment } from 'src/environments/environment';
import { Subject, BehaviorSubject } from 'rxjs';
import { CountiesInterface } from './interface/counties.interface';
import * as _ from 'lodash';
import { ConfigService } from 'src/app/core/config.service';

@Component({
  standalone: false,
  selector: 'app-service-areas',
  templateUrl: './service-areas.component.html',
  styleUrls: ['./service-areas.component.scss']
})
export class ServiceAreasComponent implements OnChanges {
  @Input() public serviceAreas?: ServiceAreasInterface[];
  @Input() public error?: boolean;
  @Input() public completion?: boolean;
  @Input() public errorMessage?: string;
  public searchExecuted: boolean;
  public counties: CountiesInterface[];
  public serviceAreasDeatils$?: BehaviorSubject<ServiceAreaDetailsInterface[]> = new BehaviorSubject([]);
  public isData: boolean;
  public loading: boolean = true;
  public noInfoText: string;
  public vendorId: string;
  public stateCode: string;
  public companyName: string;
  constructor(private _conFigService: ConfigService) {}

  ngOnChanges(): void {
   this.intit();
  }

  public intit(): void {
    this.searchExecuted = false;
    this.vendorId = this._conFigService.getVendorId();
    this.companyName = this._conFigService.getcompanyName() ? this._conFigService.getcompanyName() : '';
    // tslint:disable-next-line: max-line-length
    this.noInfoText = `Your Service Areas is not set up. Please reach out to contractor relations at ${environment.core.customerServiceNumber}.`;
    if (this.serviceAreas) {
      this.serviceAreas.length > 0 && this.completion === true ? this.isData = true : this.isData = false;
     this.counties = this.getCounties(this.serviceAreas);
     this.completion === true && this.isData === true ? this.getStateCode() : this.stateCode = '';
    //  this.getServiceAreaDetailsList(this.counties);
    }
    this.isLoading();
  }

  public isLoading(): void {
    this.completion === true ? this.loading = false : this.loading = true;
  }

  public getCounties(serviceAreas: ServiceAreasInterface[]): CountiesInterface[] {
    let counties: CountiesInterface[] = [];
    serviceAreas.forEach((serviceArea: ServiceAreasInterface) => {
       counties = serviceArea.counties;
     });
     return counties;
  }

  public getServiceAreaDetailsList(counties: CountiesInterface[]): ServiceAreaDetailsInterface[] {
    // this function flattens down the service area details of each county.
    const serviceAreaDetails: ServiceAreaDetailsInterface[] = [];
    counties.forEach((county: CountiesInterface) => {
      const flattenDetails = _.flattenDeep(county.serviceAreaDetails);
      const flattenAgain = _.flattenDeep(flattenDetails);
      const thirdFlatten = _.flattenDeep(flattenAgain);
      serviceAreaDetails.push(thirdFlatten);
    });
    return serviceAreaDetails;
  }

  public getCountyServiceAreaDetail(county: CountiesInterface): ServiceAreaDetailsInterface[] {
    return county.serviceAreaDetails;
  }

  public getStateCode(): void {
    const stateCodeObj = _.find(this.serviceAreas, ((serviceAreas: ServiceAreas) => serviceAreas.stateCode));
    stateCodeObj.stateCode ? this.stateCode = stateCodeObj.stateCode : this.stateCode = '';
  }
}
