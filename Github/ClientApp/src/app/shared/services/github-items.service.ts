import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GitHubItem } from "./interfaces/gitHub.interface";

@Injectable({ providedIn: "root" })
export class GitHubService {
  private _items$ = new BehaviorSubject<GitHubItem[]>([]);
  constructor() {}

  get items(): Observable<GitHubItem[]> {
    return this._items$.asObservable();
  }
  addItems(items: GitHubItem[]): void {
    this._items$.next([...this._items$.getValue(), ...items]);
  }
  addItem(item: GitHubItem): void {
    this.addItems([item]);
  }
  setItems(items: GitHubItem[]): void {
    this._items$.next(items);
  }
  deleteAll() {
    this.setItems([]);
  }
}
