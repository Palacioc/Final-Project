import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


const BASEURL = environment.apiURL;


@Injectable()
export class SessionService {

  emitter = new EventEmitter();

  options : Object = { withCredentials : true };

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`${BASEURL}/api/auth/signup`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`${BASEURL}/api/auth/login`, user, this.options)
      .map(res => res.json())
      .map(user=>{this.emitter.emit(user);return user})
      .catch(this.handleError);
  }

  getLoginEventEmitter(){
    return this.emitter;
  }

  logout() {
    return this.http.post(`${BASEURL}/api/auth/logout`, {}, this.options)
      .map(res => res.json())
      .map(user=>{this.emitter.emit(user);return user})
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`${BASEURL}/api/auth/loggedin`, this.options)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`${BASEURL}/api/auth/private`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
