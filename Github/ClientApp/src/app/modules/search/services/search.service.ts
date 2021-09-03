import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { GitHubService } from "src/app/shared/services/github-items.service";
import { ISearchRequest, ISearchResult } from "../interfaces/search.interface";

@Injectable()
export class SearchService {
  baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    private gitStore: GitHubService,
    @Inject("BASE_URL") baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  search(query: ISearchRequest): Observable<ISearchResult[]> {
    return this.httpClient
      .post<ISearchResult[]>(this.baseUrl + `api/search/search`, query)
      .pipe(
        tap((x) => {
          if (x) {
            this.gitStore.setItems(x);
          }
        })
      );
  }
}
