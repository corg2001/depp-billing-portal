
import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

import { FormOtherComponent } from './form-other/form-other.component';
import { FormExternalComponent } from './form-external/form-external.component';
import { FormElectricalComponent } from './form-electrical/form-electrical.component';
import { FormWellPumpSepticComponent } from './form-well-pump-septic/form-well-pump-septic.component';
import { FormWaterHeaterComponent } from './form-water-heater/form-water-heater.component';
import { FormPoolComponent } from './form-pool/form-pool.component';
import { FormPlumbingComponent } from './form-plumbing/form-plumbing.component';
import { FormApplianceComponent } from './form-appliance/form-appliance.component';
import { FormHvacComponent } from './form-hvac/form-hvac.component';
import { BaseDiagnosisFormComponent } from './base-diagnosis-form/base-diagnosis-form.component';
import { DiagnosisFormEnum } from '../model/diagnosis.enums';
import { JobDetailInterface } from './../interface/job-detail.interface';
import { FormCanDeactivate } from '../../form-can-deactivate';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss']
})
export class DiagnosisFormComponent extends FormCanDeactivate implements OnInit {
  @ViewChild('content') content: ElementRef;

  public _params$: Subscription;
  public formType: string;
  public formLabel: string;
  public jobDetail: JobDetailInterface;

  @ViewChild(FormApplianceComponent) applianceForm: BaseDiagnosisFormComponent;
  @ViewChild(FormHvacComponent) hvacForm: BaseDiagnosisFormComponent;
  @ViewChild(FormPoolComponent) poolSpaSaltwaterForm: BaseDiagnosisFormComponent;
  @ViewChild(FormPlumbingComponent) plumbingForm: BaseDiagnosisFormComponent;
  @ViewChild(FormWaterHeaterComponent) waterHeaterForm: BaseDiagnosisFormComponent;
  @ViewChild(FormWellPumpSepticComponent) wellPumpSeptic: BaseDiagnosisFormComponent;
  @ViewChild(FormElectricalComponent) electrical: BaseDiagnosisFormComponent;
  @ViewChild(FormExternalComponent) externalSewerWater: BaseDiagnosisFormComponent;
  @ViewChild(FormOtherComponent) other: BaseDiagnosisFormComponent;

  constructor(
    private _activeRoute: ActivatedRoute
  ) {
    super();
  }

  get form(): BaseDiagnosisFormComponent {
    switch (this.formType) {
      case 'appliance':
        return this.applianceForm;
      case 'hvac':
        return this.hvacForm;
      case 'plumbing':
        return this.plumbingForm;
      case 'poolSpaSaltwater':
        return this.poolSpaSaltwaterForm;
      case 'waterHeaterForm':
        return this.waterHeaterForm;
      case 'wellPumpSeptic':
        return this.wellPumpSeptic;
      case 'electrical':
        return this.electrical;
      case 'externalSewerWater':
        return this.externalSewerWater;
      case 'other':
        return this.other;
      default:
        return null;
    }
  }

  ngOnInit() {
    this._params$ = this._activeRoute.paramMap.subscribe((params: any) => {
      this.formType = params.params.formType;
      this.jobDetail = {
        jobNumber: params.params.jobNumber,
        dateRequested: params.params.dateRequested,
        customerContactPhone: params.params.customerContactPhone
      };
    });

    this.formLabel = DiagnosisFormEnum[this.formType];
  }

  public printForm(): void {
    const contentElement: HTMLElement = document.getElementById('content');
    html2canvas(contentElement)
      .then(function(canvas: HTMLCanvasElement): void {
        const imgData: string = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;
        const doc: jsPDF = new jsPDF({
          orientation: 'p',
          unit: 'mm'
        });

        let position: number = 0;
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          doc.addPage();
          doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }
        doc.save('test.pdf');
      });
  }

  public submitForm(diagnosisForm: FormGroup) {
    console.log(JSON.stringify(diagnosisForm.getRawValue()));
  }
}
