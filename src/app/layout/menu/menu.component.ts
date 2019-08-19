import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  public mainMenu: any =  [
    {
      label: 'Dashboard',
      path: '/',
      desc: 'Claim Dashboard'
    },
    {
      label: 'Payments',
      path: 'payments',
      desc: 'Review Documents'
    },
    {
      label: 'Invoices',
      path: '/account/invoice',
      desc: 'Invoice History'
    },
    {
      label: 'Contractor Profile',
      path: '/account/profile',
      desc: 'My Profile'
    },
    {
      label: 'Help',
      path: '/account/help',
      desc: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  public test(item: any): void {
    console.log(item);
  }

}
