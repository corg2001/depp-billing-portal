import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { ClaimService } from '../../claim.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  public searchForm: FormGroup;

  constructor(private _fb: FormBuilder, private _claimService: ClaimService) { }

  ngOnInit() {
    this.searchForm = this._fb.group({
      name: [''],
      jobId: [''],
      address: ['']
    });
  }

  public search(form: FormGroup): void {
    this._claimService.search(form.controls.name.value, form.controls.jobId.value, form.controls.address.value);
  }

get sf(): any {
  return this.searchForm.controls;
}

}
