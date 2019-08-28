import { Component, OnInit } from '@angular/core';

import { ProfileManagementTypes } from './../interface/profile-management-enum';
import { ProfileService } from '../services/profile.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item: string;
  public achInfoData$: Subject<any> = new Subject();
  public achInfoCallSucess$: Subject<boolean> = new  Subject();
  public profileManagementTypes = ProfileManagementTypes;
  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this.item = this.profileManagementTypes.BusinessInfo;
    this.getAchInfo();
  }

  public gotoSections(item: string) {
    this.item = item;
  }

  public getAchInfo(): void {
    this._profileService.getAchInfo(this.achInfoData$, this.achInfoCallSucess$);
    console.log(this.achInfoData$);
  }
}
