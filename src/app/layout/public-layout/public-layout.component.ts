import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-public-layout",
  templateUrl: "./public-layout.component.html",
  styleUrls: ["./public-layout.component.scss"],
})
export class PublicLayoutComponent implements OnInit {
  public appLogo = "../../../assets/images/DEPP-Logo-Stacked.svg";
  public appDEPPLogo = "../../../assets/images/DEPP-Logo-Stacked.svg";
  public logoAltText = "HWA - Home Warranty Of America";
  public url: string;

  constructor(private _router: Router) {
    this.url = _router.url;
  }
  ngOnInit() {}

  public showHwaDeppLogo(): boolean {
    return this.url === "/auth/login";
  }

  public showDeppLogo(): boolean {
    return this.url === "/enroll";
  }
}
