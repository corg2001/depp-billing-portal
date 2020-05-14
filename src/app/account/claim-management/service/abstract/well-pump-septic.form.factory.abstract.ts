import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class WellPumpSepticFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getSewageEjectorFormGroup(): FormGroup;
  public abstract getSepticTankPumpingFormGroup(): FormGroup;
}
