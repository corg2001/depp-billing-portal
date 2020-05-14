import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class WaterHeaterFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getCurrentUnitFormGroup(): FormGroup;
}
