import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/shared/services/auth.service";
import { LoginService } from "./services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginError = false;
  private subs: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private loginSrv: LoginService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: FormGroup) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  login() {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched(this.loginForm);
      return;
    }

    this.subs.push(
      this.loginSrv
        .login({
          username: this.loginForm.get("username").value,
          password: this.loginForm.get("password").value,
        })
        .subscribe(
          (res) => {
            localStorage.setItem("jwt", res.token);
            this.loginError = false;
            this.authSrv.isAuth.next(true);
            this.router.navigate(["search"]);
          },
          (err) => {
            this.loginError = true;
          }
        )
    );
  }
}
