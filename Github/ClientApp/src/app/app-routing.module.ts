import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";

export const appRoute: Route[] = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "search",
  },
  {
    path: "search",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/search/search.module").then((m) => m.SearchModule),
  },
  {
    path: "favorite",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./modules/favorites/favorites.module").then(
        (m) => m.FavoritesModule
      ),
  },
  {
    path: "login",
    loadChildren: () =>
      import("./modules/login/login.module").then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
  declarations: [],
  providers: [],
})
export class AppRoutingModule {}
