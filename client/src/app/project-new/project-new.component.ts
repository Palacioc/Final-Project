import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { ProjectService } from "../project.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styles: []
})
export class ProjectNewComponent implements OnInit {

  formInfo = {
    name: '',
    description: '',
    image: '',
    location: '',
    completed: false,
    creatorID: '58c42216af76346615e20b85'
  };

constructor(private session: SessionService, private project: ProjectService, private router: Router) { }

  ngOnInit() {
    //check if user is logged in with the event emitter
  }

  submitForm(theForm){
    console.log(this.formInfo);
    this.project.createProject(this.formInfo)
      .subscribe(

      );
    }

}
