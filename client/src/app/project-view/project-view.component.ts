import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { NeedService } from './../need.service';
import { Router } from '@angular/router';
import { SessionService } from "../session.service";


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})

export class ProjectViewComponent implements OnInit {

  userIsCreator : boolean = false;
  user : any;
  arr = Array;
  project : any;
  param : any;
  needs : any;
  total : number;
  percentageGreen : number = 0;
  percentageBlue : number = 0;
  percentageGrey : number = 0;
  numberGreen : number = 0;
  numberBlue : number = 0;
  numberGrey : number = 0;
  arrayOfColors : Array<any> = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService, private needService: NeedService, private session: SessionService) { }

  ngOnInit() {
    this.session.isLoggedIn()
      .subscribe(
        (user) => {
          this.successCb(user);
        }
   );
    this.route.params.subscribe(params => {

      this.param = params['id'];
      this.getProjectDetails(this.param);

      this.needService.getByProject(this.param)
      .subscribe((needs)=>{
        this.needs = needs;
        this.setPercentages(needs);
      });

      setTimeout(()=>{this.userIsCreator = this.project._creator._id===this.user._id}, 500);

    });
  }

  setPercentages(needs){
    needs.forEach((elem)=>{
      if(elem.status==='Green'){this.numberGreen++};
      if(elem.status==='Blue'){this.numberBlue++};
      if(elem.status==='Grey'){this.numberGrey++};
      this.total = this.numberGreen + this.numberGrey + this.numberBlue;
      this.percentageGreen = this.numberGreen / this.total;
      this.percentageGrey = this.numberGrey / this.total;
      this.percentageBlue = this.numberBlue / this.total;
      for (let i = 0; i < this.numberGreen; i++) {this.arrayOfColors.push('G')};
      for (let i = 0; i < this.numberGrey; i++) {this.arrayOfColors.push('-')};
      for (let i = 0; i < this.numberBlue; i++) {this.arrayOfColors.push('B')};
    })
  }

  getProjectDetails(id) {
    this.projectService.get(id)
      .subscribe((project) => {
        this.project = project;
      });
  }

  errorCb(err) {
    this.user.username = 'not logged in';
  }

  successCb(user) {
    this.user = user;
  }

}
