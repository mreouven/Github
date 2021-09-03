import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { FavoriteService } from "src/app/shared/services/favorite.service";
import {
  GitHubItem,
  GitHubItemFav,
} from "src/app/shared/services/interfaces/gitHub.interface";

@Component({
  selector: "app-dropdown",
  templateUrl: "./dropdown.component.html",
  styleUrls: ["./dropdown.component.scss"],
})
export class DropdownComponent implements OnInit, OnDestroy {
  data: GitHubItemFav[] = [];
  private subs: Subscription[] = [];
  constructor(private favoriteSrv: FavoriteService) {}
  ngOnDestroy(): void {
    this.subs.forEach((c) => c.unsubscribe());
  }

  ngOnInit() {
    this.subs.push(
      this.favoriteSrv.dataWithFavorite.subscribe((c) => (this.data = c))
    );
  }
  fav(item: GitHubItemFav) {
    this.favoriteSrv.triggerFavorite(item);
  }
  rowClicked(item: GitHubItem) {
    window.open(item.url, "_blank").focus();
  }
}
