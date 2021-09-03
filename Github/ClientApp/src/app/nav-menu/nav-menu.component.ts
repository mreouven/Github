import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.css"],
})
export class NavMenuComponent {
  isAuth: boolean;
  constructor(private authSrv: AuthService, private router: Router) {
    this.authSrv.isAuth.subscribe((status) => (this.isAuth = status));
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.authSrv.isAuth.next(false);
    this.router.navigate(["/login"]);
  }
}
