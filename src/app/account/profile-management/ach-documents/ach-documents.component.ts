import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { Subject, BehaviorSubject } from 'rxjs';
import { AchDocuments } from './model/ach-documents.model';

@Component({
  selector: 'app-ach-documents',
  templateUrl: './ach-documents.component.html',
  styleUrls: ['./ach-documents.component.scss']
})
export class AchDocumentsComponent implements OnInit {
  @Input() public achInfo$: BehaviorSubject<AchDocuments[]>;
  @Input() public achInfoDataSuccess: boolean;
  @Input() public loaded: boolean;
  public isData: boolean = false;
  public loading: boolean = true;
  public achInfo: AchDocuments[] = [];

  constructor(private _profileService: ProfileService) {}

  ngOnInit() {
    this.init();
  }
  public init(): void {
    this.achInfo$.subscribe((achinfo: AchDocuments[]) => {
      this.achInfo = achinfo;
      this.achInfo.length > 0 ? (this.isData = true) : (this.isData = false);
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
  }

  public showOnlyLastFour(value: string): string {
    return value.replace(/.(?=.{4})/g, 'x');
  }
}
