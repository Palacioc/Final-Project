import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  BASEURL = environment.apiURL;

  user: any;
  isGreen: boolean = true;
  isNavbarCollapsed: boolean = true;

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
    this.session.getLoginEventEmitter().subscribe((user)=>{this.user = user === null || user === undefined || user.message === 'Logged out' ? null : user});
    this.session.isLoggedIn()
      .subscribe(
        (user) => this.successCb(user)
   );
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
