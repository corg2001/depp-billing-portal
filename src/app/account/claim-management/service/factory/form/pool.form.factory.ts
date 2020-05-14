import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { PoolFormFactoryAbstract } from '../../abstract/pool.form.factory.abstract';

@Injectable()
export class PoolFormFactory extends PoolFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getPoolSpaFormGroup(): FormGroup {
    return this._formBuilder.group({
      isEquipmentShared: new FormControl(),
      isBuiltInOrFreestanding: new FormControl()
    });
  }
}

