import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class PoolFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getPoolSpaFormGroup(): FormGroup;
}
