import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { ProjectService } from "../project.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  formInfo = {
    name: '',
    description: '',
    image: '',
    location: '',
    completed: false,
    creatorID: ''
  };
  feedback: string;
  user: any;
  projectID: string;
  project: any;

  constructor(private session: SessionService, private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

   ngOnInit() {
     this.session.isLoggedIn()
     .subscribe(
       (user) => {this.user = user}
     );
     this.route.params.subscribe(params => {
       this.projectID = params['id'];
       this.getProjectDetails(this.projectID);
     });
     window.scrollTo(0,0);
   }

   getProjectDetails(id) {
     this.projectService.get(id)
       .subscribe((project) => {
         this.project = project;
       });
   }

   submitForm(theForm){
     console.log(this.formInfo);
     this.projectService.editProject(this.projectID, this.formInfo)
       .subscribe((project) => {
        this.router.navigate(['/projects/'+this.projectID]);
       });
   }

}
