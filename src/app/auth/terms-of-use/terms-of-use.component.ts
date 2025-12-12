import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  // TODO: fix tslint, add global configuration
  public modalWindowTitle: string = 'Terms Of Use';

  public completionSubject: Subject<boolean> = new Subject<boolean>();
  public dataSubject: Subject<any> = new Subject<any>();
  public termsAndConditions: any;
  public showLoadingSpinner: boolean = true;

  constructor( private _authService: AuthService) { }

  ngOnInit() {
    this.completionSubject.subscribe((response: boolean) => {
      this.showLoadingSpinner = false;
      if (!response) {
        console.log('Oops there was an error!!!');
        return;
      }
    });

    this.dataSubject.subscribe((data) => {
      this.termsAndConditions = data.message;
    });
    this.getTermsOfUse();
  }

  public getTermsOfUse(): void {
    console.log('Action: getting terms of use ...');
    this._authService.getTermsAndConditions(this.completionSubject, this.dataSubject);
  }

}
