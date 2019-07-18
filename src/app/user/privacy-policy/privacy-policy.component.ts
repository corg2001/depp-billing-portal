import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {
  // TODO: fix tslint, add global configuration
  // tslint:disable-next-line:no-inferrable-types
  public modalWindowTitle: string = 'Privacy Policy';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getPrivacyPolicy();
  }

  public getPrivacyPolicy(): void {
    console.log('Action: getting privacy policy ...');
  }

}
