import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private appService: AppService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.appService.userState().subscribe(user => {
      if (!!user) {
        let redirectUrl = '/';
        if (!!user && this.appService.isAdmin()) {
          redirectUrl = '/admin';
        }
        this.router.navigateByUrl(redirectUrl);
      }
    });
    const token = this.route.snapshot.queryParams.token;
    if (token) {
      this.appService.setToken(token);
    }
    if (this.appService.tokenExists()) {
      this.appService.initializeState();
    }

    const error = this.route.snapshot.queryParams.error;
    if (error) {
      this.appService.openSnackBar(this.snackBar, error);
      this.router.navigateByUrl('/login');
    }
  }

  login(): void {
    window.location.assign(this.appService.loginUrl());
  }
}
