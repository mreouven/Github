import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { RouterModule } from "@angular/router";
import { SearchService } from "./services/search.service";

@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SearchComponent,
      },
    ]),
  ],
  providers: [SearchService],
})
export class SearchModule {}
