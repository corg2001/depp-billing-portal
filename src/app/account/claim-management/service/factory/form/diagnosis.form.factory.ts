import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { DiagnosisFormFactoryAbstract } from '../../abstract/diagnosis.form.factory.abstract';

@Injectable()
export class DiagnosisFormFactory extends DiagnosisFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getCostFlatRateFormGroup(): FormGroup {
    return this._formBuilder.group({
      items: this._formBuilder.array([this.createCostFlatRateItem()]),
      total: new FormControl('')
    });
  }

  public getCostTimeMaterialFormGroup(): FormGroup {
    return this._formBuilder.group({
      laborHours: new FormControl(''),
      rate: new FormControl(''),
      items: this._formBuilder.array([this.createCostTimeMaterialItem()]),
      tax: new FormControl(''),
      total: new FormControl('')
    });
  }

  public getNonCoveredChargeFormGroup(): FormGroup {
    return this._formBuilder.group({
      items: this._formBuilder.array([this.createNonCoveredChargeItem()]),
      total: new FormControl('')
    });
  }

  public getPartFailureFormGroup(): FormGroup {
    return this._formBuilder.group({
      items: this._formBuilder.array([this.createPartFailureItem()])
    });
  }

  public getPurchasingFormGroup(): FormGroup {
    return this._formBuilder.group({
      items: this._formBuilder.array([this.createPurchasingItem()]),
      address1: new FormControl(''),
      address2: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
    });
  }

  public getTCFFormGroup(): FormGroup {
    return this._formBuilder.group({
      isTCFDue: new FormControl(''),
      isTCFCollected: new FormControl('')
    });
  }

  public createCostFlatRateItem(): FormGroup {
    return this._formBuilder.group({
      repair: new FormControl(''),
      repairCost: new FormControl('')
    });
  }

  public createCostTimeMaterialItem(): FormGroup {
    return this._formBuilder.group({
      partName: new FormControl(''),
      partNumber: new FormControl(''),
      partPrice: new FormControl('')
    });
  }

  public createNonCoveredChargeItem(): FormGroup {
    return this._formBuilder.group({
      item: new FormControl(''),
      reasonNotCovered: new FormControl(''),
      cost: new FormControl('')
    });
  }

  public createPartFailureItem(): FormGroup {
    return this._formBuilder.group({
      partName: new FormControl(''),
      failure: new FormControl(''),
      cause: new FormControl(''),
      comments: new FormControl('')
    });
  }

  public createPurchasingItem() {
    return this._formBuilder.group({
      partToOrder: new FormControl(''),
      partNumber: new FormControl('')
    });
  }

}

