import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {

  public appLogo = '../../../assets/images/depp-hwa-logos.jpg';
  public logoAltText = 'HWA - Home Warranty Of America';

  constructor() { }

  ngOnInit() {
  }

}
