import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProjectService {
  BASEURL: string = "http://localhost:3000";

  constructor(private http: Http) { }

  get(id) {
    return this.http.get(`${this.BASEURL}/api/projects/${id}`)
      .map((res) => res.json());
  }

}
