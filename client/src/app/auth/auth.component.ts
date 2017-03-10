import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  role: string = 'Collaborator';

  formInfo = {
    username: '',
    password: ''
  };

  showSignup: boolean = false;

  toggleSignup(){
    this.showSignup = !this.showSignup;
  }

 user: any;
 error: string;
 privateData: any;

 constructor(private session: SessionService) { }

  ngOnInit() {
   this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
     );
  }

 login() {
   if(!this.showSignup){
     this.session.login(this.formInfo)
       .subscribe(
         (user) => this.user = user,
         (err) => this.error = err
       );
   }else{
     this.showSignup = false;
   }
 }

 signup() {
   if(this.showSignup){
     this.session.signup(this.formInfo)
       .subscribe(
         (user) => this.user = user,
         (err) => this.error = err
       );
   }else{
     this.showSignup = true;
   }
 }

 logout() {
  this.session.logout()
    .subscribe(
      () => this.user = null,
      (err) => this.error = err
    );
  }

  //FALTA FUNCION LOGGEDIN

  getPrivateData() {
    this.session.getPrivateData()
      .subscribe(
        (data) => this.privateData = data,
        (err) => this.error = err
      );
  }

  errorCb(err) {
    this.error = err;
    this.user = null;
  }

  successCb(user) {
    this.user = user;
    this.error = null;
  }

}
