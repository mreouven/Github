import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GitHubItem } from "./interfaces/gitHub.interface";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  private _favorited$ = new BehaviorSubject<GitHubItem[]>([]);

  constructor() {}
  triggerFavorite(item: GitHubItem) {
    if (this._favorited$.value.includes(item)) {
      this._favorited$.next(this._favorited$.value.filter((x) => x !== item));
    } else {
      this._favorited$.next([...this._favorited$.getValue(), item]);
    }
  }

  get favorites(): Observable<GitHubItem[]> {
    return this._favorited$.asObservable();
  }
}
