import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  user: any;

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
   );
   console.log(this.session);
  }

  logout() {
   this.session.logout()
     .subscribe(
       () => {this.user = null; this.router.navigate(['/auth']);},
     );
   }

  errorCb(err) {
    this.user.username = 'not logged in';
  }

  successCb(user) {
    this.user = user;
  }

}
