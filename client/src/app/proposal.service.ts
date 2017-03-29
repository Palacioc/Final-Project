import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';


@Injectable()
export class ProposalService {

  BASEURL= environment.apiURL;

  constructor(private http: Http) { }

  get(id) {
    return this.http.get(`${this.BASEURL}/api/proposals/${id}`)
      .map((res) => res.json());
  }

  createProposal(info){
    return this.http.post(`${this.BASEURL}/api/proposals/`, info)
      .map(res => res.json())
  }

  deleteProposal(id){
    return this.http.delete(`${this.BASEURL}/api/proposals/${id}`)
      .map(res => res.json())
  }

  editProposal(id, info){
    this.http.put(`${this.BASEURL}/api/proposals/${id}`, info)
      .map(res => res.json()).subscribe((response)=>{})
  }

  getByNeed(id) {
    return this.http.get(`${this.BASEURL}/api/proposals/by-need/${id}`)
      .map((res) => res.json());
  }

  getByCreator(id) {
    return this.http.get(`${this.BASEURL}/api/proposals/by-creator/${id}`)
      .map((res) => res.json());
  }

}
