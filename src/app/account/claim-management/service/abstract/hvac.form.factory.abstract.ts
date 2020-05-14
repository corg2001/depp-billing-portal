import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class HvacFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getCurrentUnitFormGroup(): FormGroup;
  public abstract getAdditionalSpecsFormGroup(): FormGroup;
  public abstract getReplacementOnlyGroup(): FormGroup;
  public abstract createReplacementOnlyItem(): FormGroup;
}
