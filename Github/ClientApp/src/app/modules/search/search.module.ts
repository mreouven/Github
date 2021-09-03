import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { RouterModule } from "@angular/router";
import { SearchService } from "./services/search.service";
import { DropdownComponent } from "./dropdown/dropdown.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ClickOutsideModule } from "ng-click-outside";

@NgModule({
  declarations: [SearchComponent, DropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ClickOutsideModule,
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
