import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-ach-documents',
  templateUrl: './ach-documents.component.html',
  styleUrls: ['./ach-documents.component.scss']
})
export class AchDocumentsComponent implements OnInit {
  @Input() public achInfo$?: Subject<any>;
  @Input() public achInfoDataSuccess$: Subject<boolean>;
  public achInfo: any[];
  public loading: boolean = false;
  public isData: boolean = true;

  constructor() { }

  ngOnInit() {
    this.loading = true;
    this.getAchInfo();
  }

  public getAchInfo(): void {
    this.achInfoDataSuccess$.subscribe((succeed: boolean) => {
      console.log(succeed);
      this.loading = false;
      succeed ? this._achInfoSuccessHandler() : this._achInfoErrorHandler();
    });
  }

  private _achInfoSuccessHandler(): void  {

    this.achInfo$.subscribe((data: any) => {
      this.achInfo = data;
    });
  }

  private _achInfoErrorHandler(): void  {
    this.loading = false;
   this.isData = false;
  }

}
