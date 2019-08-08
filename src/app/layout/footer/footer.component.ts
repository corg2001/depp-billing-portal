import { Component, OnInit } from '@angular/core';

enum SocialMedia {
  twitter = 'https://twitter.com',
  youtube = 'https://www.youtube.com',
  facebook = 'https://facebook.com',
  linkedin = 'https://www.linkedin.com'
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public socialMediaLinks = SocialMedia;
  constructor() { }

  ngOnInit() {
  }

}
