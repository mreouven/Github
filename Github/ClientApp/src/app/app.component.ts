import { Component } from "@angular/core";
import { AuthService } from "./shared/services/auth.service";
import { FavoriteService } from "./shared/services/favorite.service";
import { SSRService } from "./shared/services/ssr.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent {
  constructor(private authSrv: AuthService, private favSrv: FavoriteService) {
    this.favSrv.restore();
    this.authSrv.unstore();
  }
  title = "app";
}
