import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { PlumbingFormFactoryAbstract } from '../../abstract/plumbing.form.factory.abstract';

@Injectable()
export class PlumbingFormFactory extends PlumbingFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getPlumbingFormGroup(): FormGroup {
    return this._formBuilder.group({
      location: new FormControl(),
      isAccessNeeded: new FormControl()
    });
  }

  public getGarbageDisposalFormGroup(): FormGroup {
    return this._formBuilder.group({
      horsepower: new FormControl()
    });
  }

  public getStoppageClogFormGroup(): FormGroup {
    return this._formBuilder.group({
      location: new FormControl()
    });
  }

  public getSumpPumpFormGroup(): FormGroup {
    return this._formBuilder.group({
      horsepower: new FormControl(),
      isRainwaterOnly: new FormControl()
    });
  }

}

