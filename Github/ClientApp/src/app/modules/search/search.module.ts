import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchComponent } from "./search.component";
import { RouterModule } from "@angular/router";
import { SearchService } from "./services/search.service";
import { TableComponent } from "./table/table.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [SearchComponent, TableComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
