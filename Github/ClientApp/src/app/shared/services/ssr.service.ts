import { isPlatformBrowser } from "@angular/common";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GitHubService } from "./github-items.service";
import { GitHubItem, GitHubItemFav } from "./interfaces/gitHub.interface";

@Injectable({
  providedIn: "root",
})
export class SSRService {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: string) {
    this.isBrowser = isPlatformBrowser(platformId);
  }
}
