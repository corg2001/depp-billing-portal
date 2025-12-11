import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  // TODO: fix tslint, add global configuration
  public modalWindowTitle: string = 'Privacy Policy';
  public completionSubject: Subject<boolean> = new Subject<boolean>();
  public dataSubject: Subject<any> = new Subject<any>();
  public privacyPolicy: any;
  public showLoadingSpinner: boolean = true;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.completionSubject.subscribe(this.completionSubscription.bind(this));
    this.dataSubject.subscribe(this.dataSubscription.bind(this));
    this.getPrivacyPolicy();
  }

  public getPrivacyPolicy(): void {
    this._authService.getPrivacyPolicy(this.completionSubject, this.dataSubject);
  }

  private completionSubscription(response: boolean): void {
    this.showLoadingSpinner = false;
    if (!response) {
      console.log('Oops there was an error!!!');
      return;
    }
  }

  private dataSubscription(data: any): any {
    this.privacyPolicy = data.message;
  }
}

