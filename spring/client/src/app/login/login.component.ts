import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = false;

  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.token != null) {
        this.loading = true;
        localStorage.setItem('token', params.token);
        localStorage.setItem('user', params.user);
        this.appService.setCurrentUser(JSON.parse(params.user));
        this.router.navigateByUrl('/');
      }
    });
  }
}
