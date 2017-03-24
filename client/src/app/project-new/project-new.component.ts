import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { ProjectService } from "../project.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";
import { environment } from '../../environments/environment';


const BASEURL = environment.apiURL;


@Component({
  selector: 'app-project-new',
  templateUrl: './project-new.component.html',
  styleUrls: ['./project-new.component.css']
})
export class ProjectNewComponent implements OnInit {
  model = 1;
  formInfo = {
    name: '',
    description: '',
    image: '',
    location: '',
    completed: false,
    creatorID: ''
  };

constructor(private session: SessionService, private project: ProjectService, private router: Router) { }

  feedback: string;
  user: any;

  uploader: FileUploader = new FileUploader({
     url: `${BASEURL}/api/projects`
   });

  ngOnInit() {
    this.session.isLoggedIn()
    .subscribe(
      (user) => {this.user = user}
    );
    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
      console.log('project created:', JSON.parse(response));
      this.router.navigate(['/projects/'+JSON.parse(response)._id]);
    };
    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  submitForm(theForm){
    console.log(this.formInfo);
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formInfo.name);
      form.append('description', this.formInfo.description);
      form.append('location', this.formInfo.location);
      form.append('completed', this.formInfo.completed);
      form.append('creatorID', this.user._id);
    };
    this.uploader.uploadAll()
  }

}
