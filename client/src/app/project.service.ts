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

  createProject(info){
    return this.http.post(`${this.BASEURL}/api/projects/`, info)
      .map(res => res.json())
  }

  deleteProject(id){
    return this.http.delete(`${this.BASEURL}/api/projects/${id}`)
      .map(res => res.json())
  }

  editProject(id, info){
    return this.http.put(`${this.BASEURL}/api/projects/${id}`, info)
      .map(res => res.json())
  }

  getByCreator(id) {
    return this.http.get(`${this.BASEURL}/api/projects/by-creator/${id}`)
      .map((res) => res.json());
  }

}
