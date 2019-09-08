import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-info',
  templateUrl: './service-info.component.html',
  styleUrls: ['./service-info.component.scss']
})
export class ServiceInfoComponent implements OnInit {
  public headertext: string;
  public emergencyCalltext: string;

  constructor() { }

  ngOnInit() {
    this.headertext = 'service call information for ';
    this.emergencyCalltext = 'You are accepting emergency calls. If you want to change this, please reach out to your Territoy Manager';
  }

}
