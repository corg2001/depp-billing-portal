import { Component, OnInit } from '@angular/core';

enum FooterLinks {
  about = 'https://www.hwahomewarranty.com/about',
  values = 'https://www.hwahomewarranty.com/about/our-values',
  news = 'https://www.hwahomewarranty.com/news',
  policy = 'https://www.hwahomewarranty.com/privacy',
  terms = 'https://www.hwahomewarranty.com/terms-of-use',
  contact = 'https://www.directenergyprotects.com/contact-us',
  faqs = 'https://www.hwahomewarranty.com/homeowners/frequently-asked-questions'
}



@Component({
  standalone: false,
  selector: 'app-footer-links',
  templateUrl: './footer-links.component.html',
  styleUrls: ['./footer-links.component.scss']
})
export class FooterLinksComponent implements OnInit {
  public footerLinks = FooterLinks;
  constructor() { }

  ngOnInit() {
  }

}
