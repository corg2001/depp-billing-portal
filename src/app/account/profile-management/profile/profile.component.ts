import { Component, OnInit } from '@angular/core';




import {ProfileManagementTypes} from './../interface/profile-management-enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item:any
  public profileManagementTypes=ProfileManagementTypes;

  constructor() {
  }

  ngOnInit() {
    this.item = this.profileManagementTypes.BusinessInfo;
  }
  gotoSections(item: string) {
    this.item = item;
  }
}
