import { Component, OnInit, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  standalone: false,
  selector: 'app-result-jumbotron',
  templateUrl: './result-jumbotron.component.html',
  styleUrls: ['./result-jumbotron.component.scss']
})
export class ResultJumbotronComponent implements OnInit {
  @Input() public resultIconSubtitle?: string;
  @Input() public resultTitle: string;
  @Input() public resultDetails: string;
  @Input() public resultStatus: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
