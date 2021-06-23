import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      emailControl: new FormControl(null, [Validators.required, Validators.email]),
      passwordControl: new FormControl(null, [Validators.required, Validators.minLength(5)])
    })
    // this.loginForm.valueChanges.subscribe(value => console.log(value))
    // this.loginForm.statusChanges.subscribe(status => console.log(status))
    // console.log(this.loginForm.controls.emailControl.errors?.required)
  }

  submit() {
    // console.log(this.loginForm)
  }
}
