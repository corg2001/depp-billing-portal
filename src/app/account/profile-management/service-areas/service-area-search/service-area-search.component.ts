import {
  Component,
  OnInit,
  OnChanges,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CountiesInterface } from '../interface/counties.interface';
import { ServiceAreaDetailsInterface } from '../interface/service-area-details.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';
import { ServiceAreasAbstractService } from '../service/abstract/service-areas-abstract.service';

@Component({
  selector: 'app-service-area-search',
  templateUrl: './service-area-search.component.html',
  styleUrls: ['./service-area-search.component.scss']
})
export class ServiceAreaSearchComponent implements OnInit, OnChanges {
  @Input() public counties?: CountiesInterface[];
  @Input() public serviceAreasDeatils$?: BehaviorSubject<ServiceAreaDetailsInterface[]> = new BehaviorSubject([]);
  public searchForm: FormGroup;
  public countyNames: string[];
  public skillTypesList: string[];
  public selectedCounty: string;
  constructor(private _fb: FormBuilder, private _serviceAreaService: ServiceAreasAbstractService) {}

  ngOnInit() {
    this.searchForm = this._fb.group({
      county: [''],
      zipcode: [''],
      skillType: ['']
    });
  }
  ngOnChanges(): void {
    this.countyNames = this.getCountyNames(this.counties);
  }

  public search(form: FormGroup) {
    const _serviceAreaDetails = this.serviceAreasDeatils$.getValue();
    // tslint:disable-next-line: max-line-length
    form.controls.zipcode.value || form.controls.skillType.value ? this.serviceAreasDeatils$.next(this._serviceAreaService.search(this.serviceAreasDeatils$.getValue(), form.controls.zipcode.value, form.controls.skillType.value)) : this.serviceAreasDeatils$.next(_serviceAreaDetails);
  }

  public getCountyNames(counties: CountiesInterface[]): string[] {
    const countyNames: string[] = [];
    counties.forEach((county: CountiesInterface) => {
      countyNames.push(county.countyName);
    });
    return countyNames;
  }


  public updateServiceDetails(countyName: any): void {
    const _countyName: string = countyName.target.value;
    const skillTypes: string[] = [];
    const county: CountiesInterface = _.find(this.counties, ((countie: CountiesInterface) => countie.countyName === _countyName));
    county.serviceAreaDetails.forEach((serviceAreaDetail: ServiceAreaDetailsInterface) => skillTypes.push(serviceAreaDetail.skillType));
    this.skillTypesList = _.uniq(skillTypes);
    this.serviceAreasDeatils$.next(county.serviceAreaDetails);
  }
}
