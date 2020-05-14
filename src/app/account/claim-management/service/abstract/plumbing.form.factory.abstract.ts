import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class PlumbingFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getPlumbingFormGroup(): FormGroup;
  public abstract getGarbageDisposalFormGroup(): FormGroup;
  public abstract getStoppageClogFormGroup(): FormGroup;
  public abstract getSumpPumpFormGroup(): FormGroup;
}
