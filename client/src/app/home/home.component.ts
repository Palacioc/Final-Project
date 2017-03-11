import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private session: SessionService, private router: Router) { }

  user: any;
  error: string;

  ngOnInit() {
   this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user),
       (err) => {this.errorCb(err)}
   );
  };

  errorCb(err) {
    this.error = err;
    this.user = null;
    // this.router.navigate(['/auth']);
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    // this.router.navigate(['/home']);
  }

}
