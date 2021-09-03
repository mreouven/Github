import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GitHubService } from "./github-items.service";
import { GitHubItem, GitHubItemFav } from "./interfaces/gitHub.interface";
import { SSRService } from "./ssr.service";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private _favorited$ = new BehaviorSubject<string[]>([]);

  constructor(private gitSrv: GitHubService, private ssrSrv: SSRService) {}
  triggerFavorite(item: GitHubItem) {
    if (this._favorited$.value.includes(item.id)) {
      this._favorited$.next(
        this._favorited$.value.filter((x) => x !== item.id)
      );
    } else {
      this._favorited$.next([...this._favorited$.getValue(), item.id]);
    }
    localStorage.setItem("fav", JSON.stringify(this._favorited$.getValue()));
  }

  restore() {
    if (this.ssrSrv.isBrowser) {
      const item = localStorage.getItem("fav");
      if (!!item) {
        this._favorited$.next(JSON.parse(item));
      }
    }
  }

  get favorites(): Observable<string[]> {
    return this._favorited$.asObservable();
  }
  get dataWithFavorite(): Observable<GitHubItemFav[]> {
    return combineLatest([this._favorited$, this.gitSrv.items]).pipe(
      map(([fav, item]) => {
        return item.map((c) => {
          return { ...c, is_fav: fav.includes(c.id) };
        });
      })
    );
  }
}
