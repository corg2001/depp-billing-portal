import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ClaimService } from '../../service/claim.service';
import { BehaviorSubject } from 'rxjs';
import { Claim } from '../../model/claims.model';
import { ClaimServiceAbstract } from '../../service/claim.abstract.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Input() public claimSubject$?: BehaviorSubject<
    Claim[]
  > = new BehaviorSubject([]);
  @Output() public updatedClaimsEmitter: EventEmitter<Claim[]> = new EventEmitter<Claim[]>();
  public searchForm: FormGroup;
  public originalClaimData: Claim[];

  constructor(private _fb: FormBuilder, private _claimService: ClaimServiceAbstract) {}

  ngOnInit() {
    this.originalClaimData = this.claimSubject$.getValue();
    this.searchForm = this._fb.group({
      name: [''],
      jobId: [''],
      address: ['']
    });
  }

  public search(form: FormGroup): void {
    form.controls.name.value ||
    form.controls.jobId.value ||
    form.controls.address.value
      ? this.updatedClaimsEmitter.emit(this._claimService.search(
          this.claimSubject$.getValue(),
          form.controls.name.value,
          form.controls.jobId.value,
          form.controls.address.value
        ))
      : this.updatedClaimsEmitter.emit(this.claimSubject$.getValue());
  }

  get sf(): any {
    return this.searchForm.controls;
  }
}
