import { Component, OnInit } from '@angular/core';
import { SessionService } from "../session.service";
import { NeedService } from "../need.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-need-new',
  templateUrl: './need-new.component.html',
  styles: []
})
export class NeedNewComponent implements OnInit {

  formInfo = {
    projectID: '58c4a37e79a0b97b8a51381d',
    name: '',
    description: '',
    image: '',
    cost: '',
    status: 'Blue',
    providerID: '',
    contributorID: '',
  };

  constructor(private session: SessionService, private need: NeedService, private router: Router) { }

  ngOnInit() {
  }

  submitForm(theForm){
    console.log(this.formInfo);
    this.need.createNeed(this.formInfo)
      .subscribe(

      );
    }

}
