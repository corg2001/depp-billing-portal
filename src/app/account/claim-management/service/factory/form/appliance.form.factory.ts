import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup
} from '@angular/forms';
import { ApplianceFormFactoryAbstract } from '../../abstract/appliance.form.factory.abstract';

@Injectable()
export class ApplianceFormFactory extends ApplianceFormFactoryAbstract {

  constructor(
    _formBuilder: FormBuilder
  ) {
    super(_formBuilder);
  }

  public getCooktopFormGroup(): FormGroup {
    return this._formBuilder.group({
      size: new FormControl(),
      gasOrElectric: new FormControl(),
      topType: new FormControl(),
      glassOrPorcelain: new FormControl(),
      hasDowndraftFan: new FormControl(),
      cordLength: new FormControl(),
      color: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl()
    });
  }

  public getCurrentUnitFormGroup(): FormGroup {
    return this._formBuilder.group({
      brand: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl(),
      age: new FormControl(),
      condition: new FormControl()
    });
  }

  public getDishwasherFormGroup(): FormGroup {
    return this._formBuilder.group({
      buttonType: new FormControl(),
      tubType: new FormControl(),
      wireType: new FormControl(),
      color: new FormControl(),
      numberWashLevels: new FormControl(),
      numberCycles: new FormControl(),
      numberSprayArms: new FormControl()
    });
  }

  public getDryerFormGroup(): FormGroup {
    return this._formBuilder.group({
      gasOrElectric: new FormControl(),
      capacity: new FormControl(),
      isStackable: new FormControl(),
      cordLength: new FormControl(),
      color: new FormControl(),
      cubicFeet: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl()
    });
  }

  public getMicrowaveFormGroup(): FormGroup {
    return this._formBuilder.group({
      microwaveType: new FormControl(),
      hasConvection: new FormControl(),
      isVented: new FormControl(),
      size: new FormControl(),
      trimKit: new FormControl(),
      wattage: new FormControl(),
      color: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl()
    });
  }

  public getOtherFormGroup(): FormGroup {
    return this._formBuilder.group({
      comments: new FormControl()
    });
  }

  public getRangeFormGroup(): FormGroup {
    return this._formBuilder.group({
      gasOrElectric: new FormControl(),
      rangeTopType: new FormControl(),
      slideDropFreestanding: new FormControl(),
      hasWindow: new FormControl(),
      hasSelfClean: new FormControl(),
      hasConvection: new FormControl(),
      cordLength: new FormControl(),
      color: new FormControl()
    });
  }

  public getRefrigeratorFormGroup(): FormGroup {
    return this._formBuilder.group({
      hasIceMaker: new FormControl(),
      refrigeratorType: new FormControl(''),
      cubicFeet: new FormControl(),
      doorType: new FormControl(''),
      color: new FormControl()
    });
  }

  public getVentHoodFormGroup(): FormGroup {
    return this._formBuilder.group({
      width: new FormControl(),
      numberSpeeds: new FormControl(),
      color: new FormControl()
    });
  }

  public getWallOvenFormGroup(): FormGroup {
    return this._formBuilder.group({
      width: new FormControl(),
      gasOrElectric: new FormControl(),
      singleOrDouble: new FormControl(),
      hasSelfClean: new FormControl(),
      hasConvection: new FormControl(),
      hasMicrowaveCombo: new FormControl(),
      color: new FormControl()
    });
  }

  public getWasherFormGroup(): FormGroup {
    return this._formBuilder.group({
      washerType: new FormControl(),
      controlType: new FormControl(),
      capacity: new FormControl(),
      color: new FormControl(),
      numberWashLevels: new FormControl(),
      numberCycles: new FormControl(),
      numberWaterTemps: new FormControl(),
      cubicFeet: new FormControl(),
      modelNumber: new FormControl(),
      serialNumber: new FormControl()
    });
  }

}

