import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';

@Component({
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

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.completionSubject.subscribe(this.completionSubscription.bind(this));
    this.dataSubject.subscribe(this.dataSubscription.bind(this));
    this.getPrivacyPolicy();
  }

  public getPrivacyPolicy(): void {
    this.userService.getPrivacyPolicy(this.completionSubject, this.dataSubject);
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

