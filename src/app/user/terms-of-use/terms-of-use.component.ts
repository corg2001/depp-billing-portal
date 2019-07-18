import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-terms-of-use',
  templateUrl: './terms-of-use.component.html',
  styleUrls: ['./terms-of-use.component.scss']
})
export class TermsOfUseComponent implements OnInit {
  // TODO: fix tslint, add global configuration
  // tslint:disable-next-line:no-inferrable-types
  public modalWindowTitle: string = 'Terms Of Use';
  constructor( private userService: UserService) { }

  ngOnInit() {
    this.getTermsOfUse();
  }

  public getTermsOfUse(): void {
    console.log('Action: getting terms of use ...');
  }

}
