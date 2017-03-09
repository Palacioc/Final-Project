import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionService {

  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(user) {
    return this.http.post(`http://localhost:3000/api/auth/signup`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  login(user) {
    return this.http.post(`http://localhost:3000/api/auth/login`, user)
      .map(res => res.json())
      .catch(this.handleError);
  }

  logout() {
    return this.http.post(`http://localhost:3000/api/auth/logout`, {})
      .map(res => res.json())
      .catch(this.handleError);
  }

  isLoggedIn() {
    return this.http.get(`http://localhost:3000/api/auth/loggedin`)
      .map(res => res.json())
      .catch((err) => this.handleError(err));
  }

  getPrivateData() {
    return this.http.get(`http://localhost:3000/api/auth/private`)
      .map(res => res.json())
      .catch(this.handleError);
  }
}
