import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Discounti';
  isAuthenticated = true; //false
  //
  // constructor(public authService: AuthService) {
  //   this.authService.isAuthenticated.subscribe(
  //     (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
  //   );
  // }

  async ngOnInit(): Promise<void> {
    // this.isAuthenticated = await this.authService.checkAuthenticated();
  }

  async logout(): Promise<void> {
    // await this.authService.logout('/');
  }
}
