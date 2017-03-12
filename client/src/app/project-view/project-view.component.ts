import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from './../project.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styles: [],
  providers: [ProjectService],
})

export class ProjectViewComponent implements OnInit {

  project : any;
  param : any;

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.param = params['id'];
      this.getProjectDetails(params['id']);
    });
  }

  getProjectDetails(id) {
    this.projectService.get(id)
      .subscribe((project) => {
        this.project = project;
      });
  }


}
