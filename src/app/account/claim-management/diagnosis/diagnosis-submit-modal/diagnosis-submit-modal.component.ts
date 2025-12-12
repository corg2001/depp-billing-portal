import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-diagnosis-submit-modal',
  templateUrl: './diagnosis-submit-modal.component.html',
  styleUrls: ['./diagnosis-submit-modal.component.scss']
})
export class DiagnosisSubmitModalComponent implements OnInit {
  @Input() public success: Boolean;

  constructor(
    private _activeModalService: NgbActiveModal
  ) { }

  ngOnInit() {
  }

  public close(): void {
    this._activeModalService.close(null);
  }
}
