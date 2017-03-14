import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';


@Injectable()
export class ProposalService {

  BASEURL: string = "http://localhost:3000";

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
      .map(res => res.json()).subscribe((response)=>{console.log('response is', response)})
  }

  getByNeed(id) {
    return this.http.get(`${this.BASEURL}/api/proposals/by-need/${id}`)
      .map((res) => res.json());
  }

}
