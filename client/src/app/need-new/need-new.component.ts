import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from "../session.service";
import { NeedService } from "../need.service";
import { ProjectService } from "../project.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-need-new',
  templateUrl: './need-new.component.html',
  styles: []
})
export class NeedNewComponent implements OnInit {

  param : any;
  user: any;
  project: any;
  feedback: string;
  uploader: FileUploader = new FileUploader({
     url: `http://localhost:3000/api/needs`
   });

  formInfo = {
    projectID: '',
    name: '',
    description: '',
    image: '',
    cost: '',
    status: 'Grey',
    providerID: '',
    collaboratorID: '',
  };

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
        this.formInfo.projectID = this.param;
        this.getProjectDetails(this.param);
      });
      this.uploader.onSuccessItem = (item, response) => {
        this.feedback = JSON.parse(response).message;
        console.log('need created:', JSON.parse(response));
        this.router.navigate(['/projects/'+this.param]);
      };
      this.uploader.onErrorItem = (item, response, status, headers) => {
        this.feedback = JSON.parse(response).message;
      };

    }

    getProjectDetails(id) {
      this.projectService.get(id)
        .subscribe((project) => {
          this.project = project;
        });
    }

    submitForm(theForm){
      console.log(this.formInfo);
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('projectID', this.formInfo.projectID);
        form.append('name', this.formInfo.name);
        form.append('description', this.formInfo.description);
        form.append('image', this.formInfo.image);
        form.append('cost', this.formInfo.cost);
        if(this.formInfo.providerID){form.append('providerID', this.formInfo.providerID); this.formInfo.status='Blue'};
        if(this.formInfo.collaboratorID) {form.append('collaboratorID', this.formInfo.collaboratorID); this.formInfo.status='Green'};
        form.append('status', this.formInfo.status);
      };
      this.uploader.uploadAll()
    }

    errorCb(err) {
      this.user.username = 'not logged in';
    }

    successCb(user) {
      this.user = user;
    }
}
