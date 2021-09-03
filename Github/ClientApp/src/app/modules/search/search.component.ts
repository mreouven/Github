import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GitHubItem } from "src/app/shared/services/interfaces/gitHub.interface";
import { SearchService } from "./services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  loader = false;
  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }
  search(Query: string) {
    this.loader = true;

    this.searchService.search({ Query }).subscribe((x) => {
      this.loader = false;
    });
  }
  submit() {
    if (this.searchForm.valid) {
      this.search(this.searchForm.get("search").value);
      this.searchForm.reset();
    }
  }
}
