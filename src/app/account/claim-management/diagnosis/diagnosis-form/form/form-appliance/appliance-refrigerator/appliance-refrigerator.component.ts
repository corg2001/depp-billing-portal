import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RefrigeratorTypeEnum, RefrigeratorDoorTypeEnum } from '../../../../../model/diagnosis.enums';

@Component({
  standalone: false,
  selector: 'app-appliance-refrigerator',
  templateUrl: './appliance-refrigerator.component.html',
  styleUrls: ['./appliance-refrigerator.component.scss']
})
export class ApplianceRefrigeratorComponent implements OnInit {
  @Input() public diagnosisForm: FormGroup;

  public keys = Object.keys;
  public refrigeratorTypes = RefrigeratorTypeEnum;
  public refrigeratorDoorTypes = RefrigeratorDoorTypeEnum;

  constructor() { }

  ngOnInit() {
  }

}
