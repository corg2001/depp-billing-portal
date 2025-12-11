import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  standalone: false,
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {
  @Input() set value(newValue: number) {
    newValue !== null
      ? (this.progressValue = this._toString(newValue))
      : (this.progressValue = '0');
  }

  public progressValue: string;

  constructor(private _modalService: NgbModal) { }

  ngOnInit() { }
  private _toString(value: number): string {
    return value.toString();
  }
}
