import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-diagnosis-disable-modal',
  templateUrl: './diagnosis-disable-modal.component.html',
  styleUrls: ['./diagnosis-disable-modal.component.scss']
})
export class DiagnosisDisableModalComponent {
  public constructor(private _activeModalService: NgbActiveModal) {
  }

  public close(): void {
    this._activeModalService.close(null);
  }
}
