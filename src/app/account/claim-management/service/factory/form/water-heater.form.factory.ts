import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { WaterHeaterFormFactoryAbstract } from '../../abstract/water-heater.form.factory.abstract';

@Injectable()
export class WaterHeaterFormFactory extends WaterHeaterFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getCurrentUnitFormGroup(): FormGroup {
    return this._formBuilder.group({
      unitType: new FormControl(),
      otherDefinition: new FormControl(),
      isStandard: new FormControl(),
      isTall: new FormControl(),
      isDirectVent: new FormControl(),
      isShortLowboy: new FormControl(),
      isPowerVent: new FormControl(),
      isMobileHome: new FormControl(),
      isPowerDirectVent: new FormControl(),
      gallonSize: new FormControl(),
      highRecoveryOption: new FormControl()
    });
  }
}

