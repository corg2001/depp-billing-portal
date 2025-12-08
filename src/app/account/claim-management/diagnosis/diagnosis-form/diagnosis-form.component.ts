import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfigService } from './../../../../core/config.service';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';

import { FormOtherComponent } from './form/form-other/form-other.component';
import { FormExternalComponent } from './form/form-external/form-external.component';
import { FormElectricalComponent } from './form/form-electrical/form-electrical.component';
import { FormWellPumpSepticComponent } from './form/form-well-pump-septic/form-well-pump-septic.component';
import { FormWaterHeaterComponent } from './form/form-water-heater/form-water-heater.component';
import { FormPoolComponent } from './form/form-pool/form-pool.component';
import { FormPlumbingComponent } from './form/form-plumbing/form-plumbing.component';
import { FormApplianceComponent } from './form/form-appliance/form-appliance.component';
import { FormHvacComponent } from './form/form-hvac/form-hvac.component';
import { BaseDiagnosisFormComponent } from './base-diagnosis-form/base-diagnosis-form.component';
import { DiagnosisFormEnum } from './../../model/diagnosis.enums';
import { JobDetailInterface } from './../../interface/job-detail.interface';
import { FormCanDeactivate } from './../../../form-can-deactivate';
import { ClaimServiceAbstract } from './../../service/abstract/claim.abstract.service';
import { DiagnosisSubmitModalComponent } from './../diagnosis-submit-modal/diagnosis-submit-modal.component';
import { PdfService } from 'src/app/core/pdf.service';

@Component({
  selector: 'app-diagnosis-form',
  templateUrl: './diagnosis-form.component.html',
  styleUrls: ['./diagnosis-form.component.scss']
})
export class DiagnosisFormComponent extends FormCanDeactivate implements OnInit {
  @ViewChild('content', { static: false }) content: ElementRef;

  public _params$: Subscription;
  public formType: string;
  public formLabel: string;
  public jobDetail: JobDetailInterface;
  public isSubmitting: boolean = false;
  public submissionComplete$: Subject<boolean> = new Subject<boolean>();

  @ViewChild(FormApplianceComponent, { static: false }) applianceForm: BaseDiagnosisFormComponent;
  @ViewChild(FormHvacComponent, { static: false }) hvacForm: BaseDiagnosisFormComponent;
  @ViewChild(FormPoolComponent, { static: false }) poolSpaSaltwaterForm: BaseDiagnosisFormComponent;
  @ViewChild(FormPlumbingComponent, { static: false }) plumbingForm: BaseDiagnosisFormComponent;
  @ViewChild(FormWaterHeaterComponent, { static: false }) waterHeaterForm: BaseDiagnosisFormComponent;
  @ViewChild(FormWellPumpSepticComponent, { static: false }) wellPumpSeptic: BaseDiagnosisFormComponent;
  @ViewChild(FormElectricalComponent, { static: false }) electrical: BaseDiagnosisFormComponent;
  @ViewChild(FormExternalComponent, { static: false }) externalSewerWater: BaseDiagnosisFormComponent;
  @ViewChild(FormOtherComponent, { static: false }) other: BaseDiagnosisFormComponent;

  constructor(
    private _activeRoute: ActivatedRoute,
    private _claimService: ClaimServiceAbstract,
    private _configService: ConfigService,
    private _modalService: NgbModal,
    private _pdfService: PdfService,
    private _router: Router
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
      case 'waterHeater':
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
    this._configService.init();
    this._params$ = this._activeRoute.paramMap.subscribe((params: any) => {
      this.formType = params.params.formType;
      this.jobDetail = this._claimService.getJobDetail();
    });
    this.formLabel = DiagnosisFormEnum[this.formType];

    this.submissionComplete$.subscribe((complete: boolean) => {
      this.isSubmitting = !complete;
    });
  }

  public printForm(): void {
    window.print();
  }

  public submitForm(diagnosisForm: FormGroup) {
    //
    // this._modalService.open()
    this.submissionComplete$.next(false);

    const companyInfo: string = this._configService.getCompanyInfo();
    const pdfBlob$: Subject<Blob> = new Subject<Blob>();
    const apiSubmitSuccess$: Subject<any> = new Subject<any>();
    const isError$: Subject<boolean> = new Subject<boolean>();

    apiSubmitSuccess$.subscribe((result: any) => {
      this.submissionComplete$.next(true);
      const submissionModalRef: NgbModalRef = this._modalService.open(
        DiagnosisSubmitModalComponent,
        { centered: true }
      );
      submissionModalRef.componentInstance.success = true;
      this.form.diagnosisForm.reset();
      this._router.navigate([
        '/account'
      ]).then(() => {
        window.scroll(0, 0);
      });
    });

    isError$.subscribe((result: boolean) => {
      this.submissionComplete$.next(true);
      const submissionModalRef: NgbModalRef = this._modalService.open(
        DiagnosisSubmitModalComponent,
        { centered: true }
      );

      submissionModalRef.componentInstance.success = false;
    });

    // pdfBlob$.subscribe((docBlob: Blob) => {
    //   this._claimService.submitDiagnosisForm(
    //     companyInfo,
    //     this.formType,
    //     this.jobDetail,
    //     docBlob,
    //     apiSubmitSuccess$,
    //     isError$
    //   );
    // });

    // this._pdfService.documentElementToPdfBlob(document, 'content', pdfBlob$, isError$);

    this._claimService.submitDiagnosisForm(
      companyInfo,
      this.formType,
      this.jobDetail,
      JSON.stringify(diagnosisForm.getRawValue()),
      apiSubmitSuccess$,
      isError$
    );
  }

}
