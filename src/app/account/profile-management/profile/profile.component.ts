import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item: string = 'business';

  constructor() {}

  ngOnInit() {
    this.item = 'business-info';
  }
  gotoSections(item: string) {
    this.item = item;
  }
}
