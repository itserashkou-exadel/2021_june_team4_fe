import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    emailControl: new FormControl('', [Validators.required, Validators.email]),
    passwordControl: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  path = '/app'

  constructor() { }

  ngOnInit(): void {
    // this.loginForm.valueChanges.subscribe(value => console.log(value))
    // this.loginForm.statusChanges.subscribe(status => console.log(status))
  }

  submit() {
    // console.log(this.loginForm)
  }
}
