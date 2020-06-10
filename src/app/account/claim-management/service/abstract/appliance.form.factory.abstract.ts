import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class ApplianceFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getCooktopFormGroup(): FormGroup;
  public abstract getCurrentUnitFormGroup(): FormGroup;
  public abstract getDishwasherFormGroup(): FormGroup;
  public abstract getDryerFormGroup(): FormGroup;
  public abstract getMicrowaveFormGroup(): FormGroup;
  public abstract getOtherFormGroup(): FormGroup;
  public abstract getRangeFormGroup(): FormGroup;
  public abstract getRefrigeratorFormGroup(): FormGroup;
  public abstract getVentHoodFormGroup(): FormGroup;
  public abstract getWallOvenFormGroup(): FormGroup;
  public abstract getWasherFormGroup(): FormGroup;
}
