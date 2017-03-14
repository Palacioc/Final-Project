import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from "../session.service";
import { NeedService } from "../need.service";
import { ProjectService } from "../project.service";
import { ProposalService } from "../proposal.service";
import { Router } from '@angular/router';
import { FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-proposal-new',
  templateUrl: './proposal-new.component.html',
  styles: []
})
export class ProposalNewComponent implements OnInit {
  formType: string;
  param : any;
  user: any;
  need: any;
  feedback: string;
  type: string;
  uploader: FileUploader = new FileUploader({
     url: `http://localhost:3000/api/needs`
   });

  formInfo = {
    needID: '',
    contributorID: '',
    coverage: '',
    comment: '',
    cost: '',
    accountNo: ''
  };

  constructor(private router: Router, private route: ActivatedRoute,
    private projectService: ProjectService, private needService: NeedService, private proposalService: ProposalService, private session: SessionService) { }

    ngOnInit() {
      this.session.isLoggedIn()
        .subscribe(
          (user) => {
            this.successCb(user);
          }
      );
      this.route.params.subscribe(params => {
        this.param = params['id'];
        this.formInfo.needID = this.param;
        this.getNeedDetails(this.param);
      });
    }

    getNeedDetails(id) {
      this.needService.get(id)
        .subscribe((need) => {
          this.need = need;
          if(this.need.status==="Grey"){
            this.type = "sourcing";
          }
          if(this.need.status==="Blue"){
            this.type = "funding";
          }
        });
    }

    submitForm(theForm){
      this.formInfo.needID = this.need._id;
      this.formInfo.contributorID = this.user._id;
      if(this.need.status==="Grey"){
        this.formInfo.coverage = "Blue"
        this.type = "sourcing";
      }
      if(this.need.status==="Blue"){
        this.formInfo.coverage = "Green";
        this.type = "funding";
        this.formInfo.cost = this.need.cost;
        this.formInfo.accountNo = '0';
      }
      console.log(this.formInfo);
      this.proposalService.createProposal(this.formInfo)
        .subscribe((proposal) => {
         this.router.navigate(['/projects/'+this.need._project._id]);
        });
    }

    errorCb(err) {
      this.user.username = 'not logged in';
    }

    successCb(user) {
      this.user = user;
    }
}
