import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/variables';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
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
                private router: Router ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)])
    })

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles
    }
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    const loginData: IUser = {
      username: this.form.value.username.trim(),
      password: this.form.value.password.trim()
    }

    this.aSub = this.auth.login(loginData).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/head']);

        this.tokenStorage.saveToken(data);
        // this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        console.log(sessionStorage);
      },
      err => {
        this.errorMessage = err.error;
        this.isLoginFailed = true;
        this.form.enable()
      }
    );
  }
}
