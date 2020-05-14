import { BaseDiagnosisFormComponent } from './claim-management/diagnosis/base-diagnosis-form/base-diagnosis-form.component';
import {ComponentCanDeactivate} from './component-can-deactivate';

export abstract class FormCanDeactivate extends ComponentCanDeactivate {

 abstract get form(): BaseDiagnosisFormComponent;

  public canDeactivate(): boolean {
    if (!this.form || !this.form.diagnosisForm) {
      return true;
    }

    return !this.form.diagnosisForm.dirty;
  }
}
