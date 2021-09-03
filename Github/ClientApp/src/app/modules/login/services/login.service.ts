import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILoginRequest, ILoginResponse } from "../interfaces/login.interface";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  baseUrl: string;
  constructor(
    private httpClient: HttpClient,
    @Inject("BASE_URL") baseUrl: string
  ) {
    this.baseUrl = baseUrl;
  }

  login(credentials: ILoginRequest): Observable<ILoginResponse> {
    return this.httpClient.post<ILoginResponse>(
      this.baseUrl + `api/search/search`,
      credentials
    );
  }
}
