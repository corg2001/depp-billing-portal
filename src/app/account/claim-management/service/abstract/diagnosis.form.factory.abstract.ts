import { FormBuilder, FormGroup } from '@angular/forms';

export abstract class DiagnosisFormFactoryAbstract {

  constructor(
    protected _formBuilder: FormBuilder
  ) {}

  public abstract getCostFlatRateFormGroup(): FormGroup;
  public abstract getCostTimeMaterialFormGroup(): FormGroup;
  public abstract getNonCoveredChargeFormGroup(): FormGroup;
  public abstract getPartFailureFormGroup(): FormGroup;
  public abstract getPurchasingFormGroup(): FormGroup;
  public abstract getTCFFormGroup(): FormGroup;

  public abstract createCostFlatRateItem(): FormGroup;
  public abstract createCostTimeMaterialItem(): FormGroup;
  public abstract createNonCoveredChargeItem(): FormGroup;
  public abstract createPartFailureItem(): FormGroup;
  public abstract createPurchasingItem(): FormGroup;
}
