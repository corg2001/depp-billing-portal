export enum DiagnosisFormEnum {
  appliance = 'Appliance Diagnosis Form',
  hvac = 'HVAC Diagnosis Form',
  poolSpaSaltwater = 'Pool-Spa-Saltwater Diagnosis Form',
  plumbing = 'Plumbing Diagnosis Form',
  waterHeater = 'Water Heater Diagnosis Form',
  wellPumpSeptic = 'Well Pump and Septic Diagnosis Form',
  electrical = 'Electrical Diagnosis Form',
  externalSewerWater = 'External Sewer and Water Diagnosis Form',
  other = 'Other Diagnosis Form'
}

export enum ApplianceTypeEnum {
  refrigerator = 'Refrigerator',
  dishwasher = 'Dishwasher',
  range = 'Range',
  wallOven = 'Wall Oven',
  cooktop = 'Cooktop',
  washer = 'Washer',
  dryer = 'Dryer',
  microwave = 'Microwave',
  ventHood = 'Vent Hood',
  other = 'Other'
}

export enum RefrigeratorTypeEnum {
  topMount = 'Top mount',
  bottomMount = 'Bottom mount',
  sideBySide = 'Side by side'
}

export enum RefrigeratorDoorTypeEnum {
  doorSwingRight = 'Door swing right',
  doorSwingLeft = 'Door swing left',
  sideBySide = 'Side by side'
}

export enum FailureCauseEnum {
  normalWT = 'Normal w/t',
  improperInstall = 'Improper install',
  improperPreviousRepair = 'Improper previous repair',
  tamperedWith = 'Tampered with',
  missingParts = 'Missing parts',
  notNormalWT = 'Not normal w/t',
  other = 'Other'
}

export enum PoolClaimTypeEnum {
  poolSpaCap1000 = 'Pool/Spa ($1000 Contract Cap)',
  saltwaterCap1500 = 'Salt Water Pool ($1500 Contract Cap)'
}

export enum PlumbingClaimTypeEnum {
  plumbing = 'Plumbing',
  garbageDisposal = 'Garbage Disposal',
  stoppageClog = 'Stoppage/Clog',
  sumpPump = 'Sump Pump',
  whirlpoolBath = 'Whirlpool Bath'
}

export enum HvacTypeEnum {
  straightAC = 'Straight AC',
  heatPump = 'Heat Pump',
  gasPack = 'Gas Pack',
  packagedHeatPump = 'Packaged Heat Pump',
  furnace = 'Furnace'
}

export enum HvacReplacementEnum {
  condenser = 'Condenser',
  compressor = 'Compressor',
  evapCoil = 'Evap Coil',
  airHandler = 'Air Handler',
  gasFurnace = 'Gas Furnace',
  gasPac = 'Gas Pac',
  packagedHeatPump = 'Packaged Heat Pump'
}

export enum WaterHeaterUnitTypeEnum {
  gas = 'Gas',
  electric = 'Electric',
  tankless = 'Tankless ($1000 cap)',
  propane = 'Propane',
  other = 'Other'
}

export enum WaterHeaterSizeEnum {
  thirty = '30',
  forty = '40',
  fifty = '50',
  sixty = '60',
  seventyFive = '75'
}

export enum WaterHeaterHighRecoveryEnum {
  btu50K = '50k BTU',
  btu65K = '65k BTU'
}

export enum WellPumpSepticClaimTypeEnum {
  wellPump = 'Well Pump ($1500 Cap)',
  sewageEjectorPump = 'Sewage Ejector Pump ($500 Cap)',
  septicSystem = 'Septic System ($500 Cap)',
  septicTankPumping = 'Septic Tank Pumping ($500 Cap)'
}

export enum ExternalClaimTypeEnum {
  sewerLine = 'External Sewer Line',
  waterLine = 'External Water Line',
}

export enum OtherClaimTypeEnum {
  ceilingExhaustFan = 'Ceiling/Exhaust Fans ($400 Cap)',
  garageDoorOpener = 'Garage Door Opener',
  pestControl = 'Pest Control',
  termiteTreatment = 'Termite Treatment',
  rekey = 'Rekey',
  telephoneLine = 'Telephone Line',
  drywall = 'Drywall',
  doorBells = 'Door Bells',
  burglarFireAlarms = 'Burglar & Fire Alarms ($400 Cap)',
  roofLeak = 'Roof Leak Repairs ($1000 Cap)'
}
