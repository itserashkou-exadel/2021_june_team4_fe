import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUserLogin } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TokenStorageService } from 'src/app/core/services/auth/token-storage.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  aSub!: Subscription;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  // roles: string[] = [];

  constructor ( private auth: AuthService,
                private tokenStorage: TokenStorageService,
                private router: Router,
                private route: ActivatedRoute ) { }

  path = '/home'


  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles
    }

    this.route.queryParams.subscribe(( params: Params) => {
      if (params['accessDenied']) {
        alert("You can't get this page. Login at first")
      }
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    const loginData: IUserLogin = {
      username: this.form.value.username.trim(),
      password: this.form.value.password.trim()
    }

    this.aSub = this.auth.login(loginData).subscribe(
      data => {
        this.router.navigate(['/home']);

        this.tokenStorage.saveToken(data);
        // this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
      },
      err => {
        console.log(err.error.message)
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.form.enable()
      }
    );
  }
}
