import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';
import { HvacFormFactoryAbstract } from '../../abstract/hvac.form.factory.abstract';

@Injectable()
export class HvacFormFactory extends HvacFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getCurrentUnitFormGroup(): FormGroup {
    return this._formBuilder.group({
      brand: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl(),
      age: new FormControl(),
      tonnage: new FormControl(),
      condition: new FormControl(),
      warrantyStatus: new FormControl(),
      numberOfUnits: new FormControl(),
      zoneServed: new FormControl(),
      efficiencyRating: new FormControl()
    });
  }

  public getAdditionalSpecsFormGroup(): FormGroup {
    return this._formBuilder.group({
      hvacType: new FormControl(null),
      r22R410aOther: new FormControl(),
      insideEquipment: new FormControl(),
      btu: new FormControl(),
      heatStripsKW: new FormControl()
    });
  }

  public getReplacementOnlyGroup(): FormGroup {
    return this._formBuilder.group({
      items: this._formBuilder.array([
        this.createReplacementOnlyItem()
      ])
    });
  }

  public createReplacementOnlyItem(): FormGroup {
    return this._formBuilder.group({
      replacementType: new FormControl(null),
      straightACHeatPump: new FormControl(),
      tonnage: new FormControl(),
      btu: new FormControl(),
      seerRequirement: new FormControl(),
      indoorUnitCompatible: new FormControl(),
      scrollRecip: new FormControl(),
      needTXV: new FormControl(),
      mpToOrderFromBuyersGuide: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      zip: new FormControl(),
      horizontalVerticalSlab: new FormControl(),
      casedUncased: new FormControl(),
      upflowDownflow: new FormControl(),
      dimensionsToMatch: new FormControl(),
      heatStripsKW: new FormControl(),
      efficiency: new FormControl,
      driveTonnage: new FormControl()
    });
  }
}
