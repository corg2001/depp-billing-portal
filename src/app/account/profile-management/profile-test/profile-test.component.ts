import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-test',
  templateUrl: './profile-test.component.html',
  styleUrls: ['./profile-test.component.scss']
})
export class ProfileTestComponent implements OnInit {
  public item: string = 'business';

  constructor() {}

  ngOnInit() {
    this.item = 'business-info';
  }
  gotoSections(item: string) {
    this.item = item;
  }
}
