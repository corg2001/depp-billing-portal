import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  public mainMenu: any =  [
    {
      label: 'Home',
      path: '/',
      desc: 'My Account Dashboard'
    },
    {
      label: 'Payments',
      path: '/user/login',
      desc: 'Payment History'
    },
    {
      label: 'Documents',
      path: '',
      desc: 'Review Documents'
    },
    {
      label: 'Contractor Profile',
      path: '',
      desc: 'My Profile'
    },
    {
      label: 'Authorize/Invoices',
      path: '',
      desc: 'Authorize Invoices'
    },
    {
      label: 'Help',
      path: 'account/help',
      desc: ''
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  public test(item: any): void {
    console.log(item);
  }

}
