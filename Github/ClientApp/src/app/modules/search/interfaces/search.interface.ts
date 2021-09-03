import { GitHubItem } from "src/app/shared/services/interfaces/gitHub.interface";

export interface ISearchResult extends GitHubItem {}

export interface ISearchRequest {
  Query: string;
}
