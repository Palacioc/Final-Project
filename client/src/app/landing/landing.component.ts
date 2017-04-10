import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  state = '1';
  constructor() { }
  BASEURL = environment.apiURL;

  ngOnInit() {
  }

}
