import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SearchService } from "./services/search.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  loader = false;
  open = false;
  constructor(private searchService: SearchService, private fb: FormBuilder) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      search: ["", Validators.required],
    });
  }
  search(Query: string) {
    this.loader = true;

    this.searchService.search({ Query }).subscribe((x) => {
      this.open = true;
      this.loader = false;
    });
  }
  triggerdd(action: boolean, event: any) {
    if (event) {
      event.stopPropagation();
    }
    this.open = action;
  }

  submit() {
    if (this.searchForm.valid) {
      this.search(this.searchForm.get("search").value);
      this.searchForm.reset();
    }
  }
}
