export interface GitHubItem {
  id: any;
  name: string;
  url: string;
  desc: string;
}

export interface GitHubItemFav extends GitHubItem {
  is_fav: boolean;
}
