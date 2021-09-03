import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import jwt_decode from "jwt-decode";
import { Router } from "@angular/router";
import { SSRService } from "./ssr.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  isAuth = new BehaviorSubject<boolean>(false);
  private _token: string;
  private tokenData: any;
  private isBrowser: boolean;
  constructor(private ssrSrv: SSRService, private router: Router) {
    this.isBrowser = this.ssrSrv.isBrowser;
  }

  setToken(token: string, navigate = false): boolean {
    try {
      this.tokenData = jwt_decode(token);
      this._token = token;
      this.isAuth.next(true);
      this.store(token);
      if (navigate) {
        this.router.navigate(["search"]);
      }
      return true;
    } catch (error) {
      this.isAuth.next(false);
      return false;
    }
  }
  get name(): string {
    return this.tokenData ? this.tokenData.sub : "";
  }

  store(token) {
    if (this.isBrowser) {
      localStorage.setItem("token", token);
    }
  }
  unstore() {
    if (this.isBrowser) {
      let token = localStorage.getItem("token");
      if (token && !this.setToken(token, true)) {
        localStorage.removeItem("token");
      }
    }
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem("token");
    }
    this.tokenData = null;
    this.isAuth.next(false);
  }
  get userInfos() {
    return this.tokenData;
  }
  get token() {
    return this._token;
  }
}
