import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  public searchForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.buildForm();
  }

  public search(): void {
    console.log('Action: search claims');

  }

  private buildForm(): void {
    const byName: FormControl = new FormControl('');

    this.searchForm = new FormGroup({
      byName
    });
  }

}
