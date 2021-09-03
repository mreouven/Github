import { Component, OnInit } from "@angular/core";
import { map } from "rxjs/operators";
import { FavoriteService } from "src/app/shared/services/favorite.service";
import {
  GitHubItem,
  GitHubItemFav,
} from "src/app/shared/services/interfaces/gitHub.interface";

@Component({
  selector: "app-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.scss"],
})
export class FavoritesComponent implements OnInit {
  data: GitHubItemFav[];
  constructor(private favoriteSrv: FavoriteService) {}

  ngOnInit() {
    this.favoriteSrv.dataWithFavorite
      .pipe(
        map((item) => {
          return item.filter((x) => x.is_fav == true);
        })
      )
      .subscribe((c) => (this.data = c));
  }
  fav(item: GitHubItemFav) {
    this.favoriteSrv.triggerFavorite(item);
  }
  rowClicked(item: GitHubItem) {
    window.open(item.url, "_blank").focus();
  }
}
