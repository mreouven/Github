import { NgModule } from "@angular/core";
import { FavoritesComponent } from "./favorites.component";
import { RouterModule, Routes } from "@angular/router";

let routes: Routes = [
  {
    path: "",
    component: FavoritesComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoritesRoutingModule {}
