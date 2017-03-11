import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styles: []
})
export class AuthComponent implements OnInit {

  formInfo = {
    username: '',
    password: '',
    email: '',
    pic: '',
    role: '1',
  };

  showSignup: boolean = false;

  submitForm(theForm){
    if(this.showSignup){
      this.signup();
    }else{
      this.login();
    }
  }

  toggleSignup(){
    this.showSignup = !this.showSignup;
  }

 user: any;
 error: string;
 privateData: any;

 constructor(private session: SessionService, private router: Router) { }

 uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/auth/signup`
  });

  feedback: string;

  ngOnInit() {
   this.session.isLoggedIn()
     .subscribe(
       (user) => this.successCb(user)
   );

  this.uploader.onSuccessItem = (item, response) => {
    this.feedback = JSON.parse(response).message;
  };

  this.uploader.onErrorItem = (item, response, status, headers) => {
    this.feedback = JSON.parse(response).message;
  };

  }

 login() {
   console.log(this.formInfo);
   this.session.login(this.formInfo)
     .subscribe(
       (user) => {this.successCb(user);},
       (err) => {this.errorCb(err)}
     );
 }

 signup() {
   const roles = ['Collaborator', 'Leader', 'Provider'];
   this.formInfo.role = roles[Number(this.formInfo.role)-1];
   console.log(this.formInfo);
  //  this.uploader.uploadAll();
   if(this.showSignup){
     this.session.signup(this.formInfo)
       .subscribe(
         (user) => {this.successCb(user);},
         (err) => this.errorCb(err)
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
    // this.router.navigate(['/auth']);
  }

  successCb(user) {
    this.user = user;
    this.error = null;
    // this.router.navigate(['/home']);
  }

}
