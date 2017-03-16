import { Component, OnInit, EventEmitter } from '@angular/core';
import { SessionService } from "../session.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  user: any;
  error: string;
  privateData: any;
  model = 1;

  formInfo = {
    username: '',
    password: '',
    email: '',
    pic: '',
    role: '',
  };

  showSignup: boolean = false;

  constructor(private session: SessionService, private router: Router) { }

  feedback: string;


  ngOnInit() {
    this.session.isLoggedIn()
    .subscribe(
      (user) => this.successCb(user)
    );
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      this.session.getLoginEventEmitter().emit(JSON.parse(response));
      this.router.navigate(['/home']);
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
    window.scrollTo(0,0);

  }

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



 uploader: FileUploader = new FileUploader({
    url: `http://localhost:3000/api/auth/signup`
  });


 login() {
   console.log(this.formInfo);
   this.session.login(this.formInfo)
     .subscribe(
       (user) => {this.successCb(user);this.router.navigate(['/home']);},
       (err) => {this.errorCb(err)}
     );
 }

 signup() {
   const roles = ['Collaborator', 'Leader', 'Provider'];
   console.log('the number captured',this.formInfo.role);
   this.formInfo.role = roles[Number(this.formInfo.role)-1];
   if(this.showSignup){
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('username', this.formInfo.username);
      form.append('email', this.formInfo.email);
      form.append('password', this.formInfo.password);
      form.append('pic', this.formInfo.pic);
      form.append('role', this.formInfo.role);
    };
    this.uploader.uploadAll()
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
