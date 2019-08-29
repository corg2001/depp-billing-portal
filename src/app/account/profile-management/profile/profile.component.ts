import { Component, OnInit } from '@angular/core';

import { ProfileManagementTypes } from './../interface/profile-management-enum';
import { ProfileService } from '../service/profile.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { ConfigService } from 'src/app/core/config.service';
import { AchDocuments } from '../ach-documents/model/ach-documents.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public item: string;
  public achInfoData$: BehaviorSubject<AchDocuments[]> = new BehaviorSubject(
    []
  );
  public achInfoCallSucess$: Subject<boolean> = new Subject();
  public achInfo: AchDocuments[] = [];
  public profileManagementTypes = ProfileManagementTypes;
  public achInfoCallSucess: boolean;
  public achInfoLoading: boolean = true;
  constructor(
    private _profileService: ProfileService,
    private _configService: ConfigService
  ) {}

  ngOnInit() {
    this._configService.init();
    this.item = this.profileManagementTypes.BusinessInfo;
    this.getAchInfo();
  }

  public gotoSections(item: string) {
    this.item = item;
  }

  public getAchInfo(): void {
    this._profileService.getAchInfo(this.achInfoData$, this.achInfoCallSucess$);
  }
}
