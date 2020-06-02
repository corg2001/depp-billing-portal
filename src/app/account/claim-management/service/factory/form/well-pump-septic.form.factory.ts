import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { WellPumpSepticFormFactoryAbstract } from '../../abstract/well-pump-septic.form.factory.abstract';

@Injectable()
export class WellPumpSepticFormFactory extends WellPumpSepticFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getSewageEjectorFormGroup(): FormGroup {
    return this._formBuilder.group({
      horsepower: new FormControl()
    });
  }

  public getSepticTankPumpingFormGroup(): FormGroup {
    return this._formBuilder.group({
      gallons: new FormControl(),
      isCertNeeded: new FormControl(),
      hasBeenPumped: new FormControl()
    });
  }
}

