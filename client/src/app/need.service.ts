import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class NeedService {
  BASEURL = environment.apiURL;

  emitter = new EventEmitter();

  constructor(private http: Http) { }

  get(id) {
    return this.http.get(`${this.BASEURL}/api/needs/${id}`)
      .map((res) => res.json());
  }

  getByProject(id) {
    return this.http.get(`${this.BASEURL}/api/needs/by-project/${id}`)
      .map((res) => res.json());
  }

  createNeed(info){
    return this.http.post(`${this.BASEURL}/api/needs/`, info)
      .map(res => res.json())
  }

  deleteNeed(id){
    return this.http.delete(`${this.BASEURL}/api/needs/${id}`)
      .map(res => res.json())
  }

  getDeletedEventEmitter(){
    return this.emitter;
  }

  editNeed(id, info){
    this.http.put(`${this.BASEURL}/api/needs/${id}`, info)
      .map(res => res.json()).subscribe((response)=>{console.log('response is', response)})
  }

}
